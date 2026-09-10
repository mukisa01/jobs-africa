"use client";

import { useState } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  category: string;
  location: string;
  budget: string;
  type: string;
  description: string;
};

export default function EditJobForm({ job }: { job: Job }) {
  const [title, setTitle] = useState(job.title);
  const [company, setCompany] = useState(job.company);
  const [category, setCategory] = useState(job.category);
  const [location, setLocation] = useState(job.location);
  const [budget, setBudget] = useState(job.budget);
  const [type, setType] = useState(job.type);
  const [description, setDescription] = useState(job.description);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          company,
          category,
          location,
          budget,
          type,
          description,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Job updated successfully.");
      } else {
        setError(result.message || "Failed to update job.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 font-semibold text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-50 p-4 font-semibold text-green-700">
          {success}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="mb-2 block font-semibold text-slate-700"
        >
          Job Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
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
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
        >
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
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
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
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
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
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
        >
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={7}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Updating Job..." : "Update Job"}
      </button>
    </form>
  );
}