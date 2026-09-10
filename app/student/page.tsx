import Link from "next/link";

export default function StudentDashboard() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-2xl bg-emerald-700 p-8 text-white">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="mt-2">
            Welcome to your Jobs Africa student dashboard.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/jobs"
            className="rounded-2xl bg-white p-6 shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900">
              Find Jobs
            </h2>
            <p className="mt-2 text-slate-600">
              Browse available freelance jobs and opportunities.
            </p>
          </Link>

          <Link
            href="/apply"
            className="rounded-2xl bg-white p-6 shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900">
              Apply for Jobs
            </h2>
            <p className="mt-2 text-slate-600">
              Submit applications for jobs you are interested in.
            </p>
          </Link>

          <Link
            href="/track"
            className="rounded-2xl bg-white p-6 shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-bold text-slate-900">
              Track Applications
            </h2>
            <p className="mt-2 text-slate-600">
              Check the status of your job applications.
            </p>
          </Link>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-bold text-slate-900">
            Verification
          </h2>

          <p className="mt-2 text-slate-600">
            Complete your $3 verification payment when required and submit
            your payment proof for review.
          </p>
        </div>
      </div>
    </main>
  );
}