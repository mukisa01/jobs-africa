import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "jobs-africa-development-secret"
);

export default async function AdminDashboard() {
  // Get the login cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("jobs_africa_session")?.value;

  // If there is no login cookie, send the user to login
  if (!token) {
    redirect("/login");
  }

  // Verify the JWT
  let payload;

  try {
    const result = await jwtVerify(token, secret);
    payload = result.payload;
  } catch {
    // Invalid or expired session
    redirect("/login");
  }

  // Only ADMIN users can access this page
  if (payload.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Jobs Africa Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Manage jobs, applications and payment verification.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/admin/jobs"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">💼</div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Manage Jobs
            </h2>

            <p className="mt-2 text-slate-600">
              Create, edit and manage freelance jobs.
            </p>

            <p className="mt-5 font-bold text-emerald-700">
              Open Jobs →
            </p>
          </Link>

          <Link
            href="/admin/applications"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">📋</div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Applications
            </h2>

            <p className="mt-2 text-slate-600">
              Review and manage student job applications.
            </p>

            <p className="mt-5 font-bold text-emerald-700">
              Open Applications →
            </p>
          </Link>

          <Link
            href="/admin/payments"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">💳</div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Payments
            </h2>

            <p className="mt-2 text-slate-600">
              Review payment proofs and verify student payments.
            </p>

            <p className="mt-5 font-bold text-emerald-700">
              Open Payments →
            </p>
          </Link>
        </div>

        <div className="mt-10 rounded-2xl bg-emerald-700 p-8 text-white">
          <h2 className="text-2xl font-bold">
            Administrator
          </h2>

          <p className="mt-2 text-emerald-50">
            Welcome to the Jobs Africa administration area.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/admin/jobs/new"
              className="rounded-lg bg-white px-5 py-3 font-bold text-emerald-700 hover:bg-emerald-50"
            >
              + Create New Job
            </Link>

            <Link
              href="/admin/payments"
              className="rounded-lg border border-white px-5 py-3 font-bold text-white hover:bg-white/10"
            >
              Review Payments
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}