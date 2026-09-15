"use client";

import { useFormState, useFormStatus } from "react-dom";
import Logo from "@/components/Logo";
import { signIn } from "@/actions/auth";

function Submit() {
  const { pending } = useFormStatus();
  return <button className="btn-primary w-full" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>;
}

export default function LoginPage() {
  const [state, action] = useFormState(signIn, null);
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8">
        <Logo />
        <h1 className="mt-6 text-2xl">Admin sign in</h1>
        <form action={action} className="mt-6 grid gap-4">
          <div><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required className="field" autoComplete="username" /></div>
          <div><label className="label" htmlFor="password">Password</label><input id="password" name="password" type="password" required className="field" autoComplete="current-password" /></div>
          {state?.error && <p className="text-sm text-red-700">{state.error}</p>}
          <Submit />
        </form>
      </div>
    </div>
  );
}
