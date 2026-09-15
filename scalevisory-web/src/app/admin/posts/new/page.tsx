import PostForm from "@/components/admin/PostForm";

export default function NewPost() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl">New post</h1>
      <div className="mt-6 rounded-lg border border-line bg-white p-6"><PostForm /></div>
    </div>
  );
}
