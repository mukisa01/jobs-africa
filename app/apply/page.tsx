"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const jobId = searchParams.get("job");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");

    if (!jobId) {
      setError(
        "No job was selected. Please go back to Jobs and click Apply on a specific job."
      );
      return;
    }

    setSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      formData.set("jobId", jobId);

      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Failed to submit application.");
        return;
      }

      if (result.success && result.referenceNumber) {
        alert(
          `Application submitted successfully!\n\n` +
            `Your application reference number is:\n` +
            `${result.referenceNumber}\n\n` +
            `You will now continue to verification payment.`
        );

        router.push(`/pay/${result.referenceNumber}`);
        return;
      }

      setError(result.message || "Failed to submit application.");
    } catch (error) {
      console.error("Application submission error:", error);

      setError(
        "Something went wrong while submitting your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <a
          href="/jobs"
          className="mb-6 inline-block font-semibold text-emerald-700 hover:text-emerald-800"
        >
          ← Back to Jobs
        </a>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Apply for a Job
            </h1>

            <p className="mt-2 text-slate-600">
              Complete the form below to submit your application.
            </p>

            {!jobId && (
              <div className="mt-4 rounded-lg bg-red-50 p-4 font-semibold text-red-700">
                No job has been selected. Please return to the Jobs page and
                choose a job before applying.
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 font-semibold text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block font-semibold text-slate-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
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
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block font-semibold text-slate-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="education"
                className="mb-2 block font-semibold text-slate-700"
              >
                Education
              </label>

              <input
                id="education"
                name="education"
                type="text"
                required
                placeholder="e.g. UCE, UACE, Diploma, Degree, PhD"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="skills"
                className="mb-2 block font-semibold text-slate-700"
              >
                Skills
              </label>

              <textarea
                id="skills"
                name="skills"
                required
                rows={4}
                placeholder="Describe your skills and experience"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="coverLetter"
                className="mb-2 block font-semibold text-slate-700"
              >
                Cover Letter
              </label>

              <textarea
                id="coverLetter"
                name="coverLetter"
                required
                rows={7}
                placeholder="Write your cover letter"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="cv"
                className="mb-2 block font-semibold text-slate-700"
              >
                CV
              </label>

              <input
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

              <p className="mt-2 text-sm text-slate-500">
                Upload your CV in PDF, DOC, or DOCX format.
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
              A $3 verification fee is required after your application is
              submitted.
            </div>

            <button
              type="submit"
              disabled={submitting || !jobId}
              className="w-full rounded-lg bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Submitting Application..."
                : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-100">
          <p className="font-semibold text-slate-600">
            Loading application form...
          </p>
        </main>
      }
    >
      <ApplyForm />
    </Suspense>
  );
}