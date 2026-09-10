"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.message || "Invalid email or password.");
        return;
      }

      if (result.user?.role === "ADMIN") {
        router.push("/admin");
      } else if (result.user?.role === "CLIENT") {
        router.push("/client");
      } else {
        router.push("/student");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <Link
              href="/"
              className="text-2xl font-extrabold text-emerald-700"
            >
              JOBS AFRICA
            </Link>

            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-slate-600">
              Log in to your Jobs Africa account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
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
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4 font-semibold text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-emerald-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 hover:text-emerald-700"
            >
              ← Back to Jobs Africa
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}