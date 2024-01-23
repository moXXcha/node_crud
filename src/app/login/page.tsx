"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    console.log("dfafdafda");
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="border"
        placeholder="password"
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={() => handleSignIn()}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
}
