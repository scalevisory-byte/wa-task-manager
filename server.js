const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();
app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const WA_TOKEN = process.env.WA_TOKEN;
const WA_PHONE_ID = process.env.WA_PHONE_ID;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "scaletask123";

let tasks = [];
let taskId = 1;

// ── Webhook verification ─────────────────────────────────────────────────────
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ── Incoming WhatsApp messages ───────────────────────────────────────────────
app.post("/webhook", async (req, res) => {
  res.sendStatus(200);
  try {
    const entry = req.body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const messages = value?.messages;
    if (!messages || messages.length === 0) return;

    const msg = messages[0];
    const from = msg.from;
    const text = msg.text?.body?.trim();
    if (!text) return;

    const senderName = value?.contacts?.[0]?.profile?.name || from;
    console.log(`Message from ${senderName}: ${text}`);

    // Check if it's a command
    const lower = text.toLowerCase();
    if (lower === "tasks" || lower === "my tasks" || lower === "show tasks") {
      await sendTaskList(from);
      return;
    }
    if (lower.startsWith("done ") || lower.startsWith("complete ")) {
      const keyword = lower.replace("done ", "").replace("complete ", "");
      const task = tasks.find(t => !t.done && t.title.toLowerCase().includes(keyword));
      if (task) {
        task.done = true;
        await sendWA(from, `✅ Marked done: "${task.title}"`);
      } else {
        await sendWA(from, `❌ Task not found. Send "tasks" to see your list.`);
      }
      return;
    }
    if (lower === "summary" || lower === "report") {
      await sendSummary(from);
      return;
    }

    // AI task detection
    const result = await detectTask(text, senderName);
    if (result.is_task) {
      const task = {
        id: taskId++,
        title: result.title,
        assignee: senderName,
        due: result.due || "",
        priority: result.priority || "p2",
        done: false,
        source: "whatsapp",
        originalMessage: text,
        from,
        createdAt: new Date().toISOString(),
      };
      tasks.unshift(task);
      const pLabel = { p1: "🔴 High", p2: "🟡 Medium", p3: "🟢 Low" };
      await sendWA(from,
        `✅ *Task added!*\n\n📋 ${task.title}\n👤 ${senderName}\n${task.due ? `📅 Due: ${task.due}\n` : ""}⚡ Priority: ${pLabel[task.priority]}\n\nSend "tasks" to see all tasks.`
      );
    }
  } catch (err) {
    console.error("Webhook error:", err.message);
  }
});

async function detectTask(text, sender) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: `You are a task detection AI. Analyze WhatsApp messages and decide if they contain actionable tasks.
Respond ONLY with JSON:
- If task: {"is_task": true, "title": "short task title", "priority": "p1|p2|p3", "due": "YYYY-MM-DD or null"}
- If not: {"is_task": false}
Priority: p1=urgent, p2=medium, p3=low. Today: ${new Date().toISOString().split("T")[0]}.
No markdown, no extra text.`,
      messages: [{ role: "user", content: `Message from ${sender}: "${text}"` }],
    });
    const raw = response.content[0].text.replace(/```json|```/g, "").trim();
    return JSON.parse(raw);
  } catch {
    return { is_task: false };
  }
}

async function sendWA(to, message) {
  await axios.post(
    `https://graph.facebook.com/v20.0/${WA_PHONE_ID}/messages`,
    { messaging_product: "whatsapp", to, type: "text", text: { body: message } },
    { headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" } }
  );
}

async function sendTaskList(to) {
  const active = tasks.filter(t => !t.done);
  if (active.length === 0) {
    await sendWA(to, "📋 No pending tasks! Send me a message with a task to add one.");
    return;
  }
  const pLabel = { p1: "🔴", p2: "🟡", p3: "🟢" };
  const list = active.slice(0, 10).map((t, i) =>
    `${i + 1}. ${pLabel[t.priority]} ${t.title}${t.due ? ` (${t.due})` : ""}`
  ).join("\n");
  await sendWA(to, `📋 *Your Tasks (${active.length})*\n\n${list}\n\nReply "done [keyword]" to complete a task.`);
}

async function sendSummary(to) {
  const active = tasks.filter(t => !t.done);
  const done = tasks.filter(t => t.done);
  const high = active.filter(t => t.priority === "p1");
  const today = new Date().toISOString().split("T")[0];
  const dueToday = active.filter(t => t.due === today);
  await sendWA(to,
    `📊 *Task Summary*\n\n✅ Completed: ${done.length}\n📋 Pending: ${active.length}\n🔴 High priority: ${high.length}\n📅 Due today: ${dueToday.length}\n\nSend "tasks" to see full list.`
  );
}

// ── REST API for Task Manager app ────────────────────────────────────────────
app.get("/tasks", (req, res) => res.json(tasks));
app.patch("/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Not found" });
  Object.assign(task, req.body);
  res.json(task);
});
app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.json({ ok: true });
});
app.post("/tasks", (req, res) => {
  const task = { id: taskId++, done: false, source: "manual", ...req.body };
  tasks.unshift(task);
  res.json(task);
});
app.get("/status", (req, res) => res.json({ ok: true, tasks: tasks.length }));
app.get("/", (req, res) => res.send("WhatsApp Task Manager API is running ✅"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
