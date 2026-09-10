"use client";

import { useState } from "react";

type ApplicationResult = {
  referenceNumber: string;
  fullName: string;
  email: string;
  education: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
};

export default function TrackApplicationPage() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [application, setApplication] =
    useState<ApplicationResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrack(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setApplication(null);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/applications/track?reference=${encodeURIComponent(
          referenceNumber.trim()
        )}`
      );

      const result = await response.json();

      if (result.success) {
        setApplication(result.application);
      } else {
        setError(result.message || "Application not found.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="mb-6 inline-block font-semibold text-emerald-700 hover:text-emerald-800"
        >
          ← Back to Jobs Africa
        </a>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Track Your Application
            </h1>

            <p className="mt-3 text-slate-600">
              Enter the reference number you received after submitting
              your application.
            </p>
          </div>

          <form onSubmit={handleTrack} className="mt-8">
            <label
              htmlFor="referenceNumber"
              className="mb-2 block font-semibold text-slate-700"
            >
              Application Reference Number
            </label>

            <input
              id="referenceNumber"
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              required
              placeholder="e.g. JA-1788783457701"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Checking..." : "Track Application"}
            </button>
          </form>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 font-semibold text-red-700">
              {error}
            </div>
          )}

          {application && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Application Found
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Reference Number
                  </p>

                  <p className="font-bold text-emerald-700">
                    {application.referenceNumber}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Applicant
                  </p>

                  <p className="text-lg text-slate-900">
                    {application.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Email
                  </p>

                  <p className="text-slate-900">
                    {application.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Education
                  </p>

                  <p className="text-slate-900">
                    {application.education}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Verification Payment
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-4 py-2 text-sm font-bold ${
                      application.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : application.paymentStatus === "Submitted"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {application.paymentStatus}
                  </span>

                  {application.paymentStatus !== "Paid" && (
                    <a
                      href={`/pay/${application.referenceNumber}`}
                      className="mt-3 block font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      Complete verification payment →
                    </a>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Application Status
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-4 py-2 text-sm font-bold ${
                      application.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : application.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Submitted
                  </p>

                  <p className="text-slate-900">
                    {new Date(
                      application.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}