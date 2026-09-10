import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      User: true,
    },
  });

  const job = jobs.find(
    (item) =>
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === id
  );

  if (!job) {
    notFound();
  }

  const clientName = job.User?.fullName || "Jobs Africa Client";
  const jobType = job.remote ? "Remote" : "On-site";
  const location = job.location || "Not specified";
  const budget = job.budget || "Negotiable";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="text-2xl font-bold text-emerald-700"
          >
            Jobs Africa
          </a>

          <div className="flex gap-3">
            <a
              href="/jobs"
              className="rounded-lg px-4 py-2 font-medium hover:bg-slate-100"
            >
              All Jobs
            </a>

            <a
              href="/track"
              className="rounded-lg border border-emerald-700 px-4 py-2 font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              Track Application
            </a>
          </div>
        </div>
      </header>

      <section className="bg-emerald-800 px-6 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
              {job.category}
            </span>

            <span className="rounded-full bg-white/15 px-3 py-1 text-sm">
              {jobType}
            </span>

            <span className="rounded-full bg-white/15 px-3 py-1 text-sm">
              {location}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            {job.title}
          </h1>

          <p className="mt-3 text-xl text-emerald-100">
            {clientName}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[1fr_320px]">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Job Description
            </h2>

            <p className="mt-5 whitespace-pre-wrap leading-8 text-slate-600">
              {job.description}
            </p>

            <div className="mt-8 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Job Information
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Company / Client
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {clientName}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Category
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {job.category}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {location}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Job Type
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {jobType}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Required Skills
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {job.skills}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    Qualification
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {job.qualification}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-2xl bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">
              Budget
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-700">
              {budget}
            </p>

            <div className="mt-8">
              <a
                href={`/apply?job=${job.id}`}
                className="block w-full rounded-lg bg-emerald-700 px-6 py-4 text-center font-bold text-white hover:bg-emerald-800"
              >
                Apply Now
              </a>
            </div>

            <a
              href="/jobs"
              className="mt-4 block w-full rounded-lg border border-slate-300 px-6 py-4 text-center font-semibold text-slate-700 hover:bg-slate-50"
            >
              Browse More Jobs
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-6 py-10 text-slate-300">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-white">
            Jobs Africa
          </h2>

          <p className="mt-2 text-sm">
            Connecting African talent with opportunities.
          </p>

          <p className="mt-6 text-sm">
            © 2026 Jobs Africa. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}