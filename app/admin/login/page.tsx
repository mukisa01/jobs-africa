"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = "/admin/applications";
    } else {
      setError(result.message || "Invalid username or password.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Jobs Africa
          </h1>

          <p className="mt-2 text-slate-600">
            Admin Login
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block font-semibold text-slate-700"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-semibold text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800"
          >
            Login
          </button>
        </form>

        <a
          href="/"
          className="mt-6 block text-center font-semibold text-emerald-700 hover:text-emerald-800"
        >
          ← Back to Jobs Africa
        </a>
      </div>
    </main>
  );
}