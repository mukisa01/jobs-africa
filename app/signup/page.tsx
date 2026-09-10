"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.message || "Unable to create account.");
        return;
      }

      setMessage("Account created successfully. You can now log in.");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
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
              Create Account
            </h1>

            <p className="mt-2 text-slate-600">
              Join Jobs Africa and start finding opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block font-semibold text-slate-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

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
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4 font-semibold text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-lg bg-green-50 p-4 font-semibold text-green-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-emerald-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}