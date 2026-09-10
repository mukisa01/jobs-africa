"use client";

import { useState } from "react";

export default function NewJobPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        body: JSON.stringify({
          title: formData.get("title"),
          company: formData.get("company"),
          category: formData.get("category"),
          location: formData.get("location"),
          budget: formData.get("budget"),
          type: formData.get("type"),
          description: formData.get("description"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Job created successfully.");
        form.reset();
      } else {
        setError(result.message || "Failed to create job.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <a
          href="/admin/jobs"
          className="mb-6 inline-block font-semibold text-emerald-700 hover:text-emerald-800"
        >
          ← Back to Jobs
        </a>

        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Job
          </h1>

          <p className="mt-2 text-slate-600">
            Create a new freelance opportunity for Jobs Africa.
          </p>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4 font-semibold text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-lg bg-green-50 p-4 font-semibold text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-semibold text-slate-700"
              >
                Job Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="e.g. Graphic Designer"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="mb-2 block font-semibold text-slate-700"
              >
                Company
              </label>

              <input
                id="company"
                name="company"
                type="text"
                required
                placeholder="e.g. African Tech Ltd"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block font-semibold text-slate-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Marketing">Marketing</option>
                <option value="Data Entry">Data Entry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block font-semibold text-slate-700"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                required
                placeholder="e.g. Remote or Uganda"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="budget"
                className="mb-2 block font-semibold text-slate-700"
              >
                Budget
              </label>

              <input
                id="budget"
                name="budget"
                type="text"
                required
                placeholder="e.g. $50 - $150"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="mb-2 block font-semibold text-slate-700"
              >
                Job Type
              </label>

              <select
                id="type"
                name="type"
                required
                defaultValue=""
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              >
                <option value="" disabled>
                  Select job type
                </option>
                <option value="Freelance">Freelance</option>
                <option value="Part-time">Part-time</option>
                <option value="Project">Project</option>
                <option value="Full-time">Full-time</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block font-semibold text-slate-700"
              >
                Job Description
              </label>

              <textarea
                id="description"
                name="description"
                required
                rows={7}
                placeholder="Describe the job, responsibilities and requirements..."
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Job..." : "Create Job"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}