import { prisma } from "@/lib/prisma";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      User: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold text-emerald-700">
            Jobs Africa
          </a>

          <div className="flex gap-3">
            <a
              href="/"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Home
            </a>

            <a
              href="/track"
              className="rounded-lg border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              Track Application
            </a>
          </div>
        </div>
      </header>

      {/* Page heading */}
      <section className="bg-emerald-800 px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold text-emerald-200">
            JOBS AFRICA OPPORTUNITIES
          </p>

          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Find freelance jobs
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-emerald-50">
            Discover freelance opportunities from businesses across Africa
            and start building your professional experience.
          </p>
        </div>
      </section>

      {/* Jobs */}
      <section className="mx-auto max-w-7xl px-6 py-10 pb-20">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Available jobs</h2>

          <p className="mt-1 text-slate-500">
            {jobs.length} freelance opportunities available
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              No jobs available
            </h3>

            <p className="mt-2 text-slate-500">
              Please check again later for new opportunities.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {jobs.map((job) => {
              const jobSlug = job.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

              const jobType = job.remote ? "Remote" : "On-site";
              const location = job.location || "Not specified";
              const budget = job.budget || "Negotiable";
              const company =
                job.User?.fullName || "Jobs Africa Client";

              return (
                <article
                  key={job.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col justify-between gap-5 md:flex-row">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {job.category}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {jobType}
                        </span>

                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {location}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold">
                        {job.title}
                      </h3>

                      <p className="mt-1 font-medium text-slate-600">
                        {company}
                      </p>

                      <p className="mt-4 max-w-3xl text-slate-600">
                        {job.description}
                      </p>

                      <div className="mt-5">
                        <span className="text-sm text-slate-500">
                          Budget
                        </span>

                        <p className="font-bold text-emerald-700">
                          {budget}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center md:w-36">
                      <a
                        href={`/jobs/${jobSlug}`}
                        className="block w-full rounded-lg bg-slate-900 px-5 py-3 text-center font-semibold text-white hover:bg-slate-800"
                      >
                        View Job
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-6 py-10 text-slate-300">
        <div className="mx-auto max-w-7xl">
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