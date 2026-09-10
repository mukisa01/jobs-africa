import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StatusButtons from "./StatusButtons";

export default async function ApplicationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    redirect("/admin/login");
  }

  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      User: true,
      job: true,
    },
  });

  if (!application) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
          <h1 className="text-2xl font-bold text-slate-900">
            Application Not Found
          </h1>

          <a
            href="/admin/applications"
            className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white"
          >
            Back to Applications
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <a
          href="/admin/applications"
          className="mb-6 inline-block font-semibold text-emerald-700 hover:text-emerald-800"
        >
          ← Back to Applications
        </a>

        <div className="rounded-xl bg-white p-8 shadow">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Application Details
              </h1>

              <p className="mt-2 text-slate-600">
                Review this applicant's information.
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                application.status === "ACCEPTED"
                  ? "bg-green-100 text-green-800"
                  : application.status === "REJECTED"
                    ? "bg-red-100 text-red-800"
                    : application.status === "SHORTLISTED"
                      ? "bg-blue-100 text-blue-800"
                      : application.status === "REVIEWING"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {application.status}
            </span>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-500">
                Full Name
              </p>
              <p className="text-lg text-slate-900">
                {application.User?.fullName || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Email
              </p>
              <p className="text-lg text-slate-900">
                {application.User?.email || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Phone
              </p>
              <p className="text-lg text-slate-900">
                {application.phone || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Applied Job
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {application.job?.title || "Job not found"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Qualification
              </p>
              <p className="text-lg text-slate-900">
                {application.User?.qualification || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Skills
              </p>
              <p className="whitespace-pre-wrap text-lg text-slate-900">
                {application.User?.skills || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Cover Letter
              </p>

              <div className="mt-2 rounded-lg bg-slate-50 p-5">
                <p className="whitespace-pre-wrap text-slate-700">
                  {application.coverLetter}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                CV
              </p>

              {application.cvPath ? (
                <a
                  href={application.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
                >
                  View / Download CV
                </a>
              ) : (
                <p className="mt-2 text-lg text-slate-500">
                  No CV uploaded
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Application Reference
              </p>

              <p className="text-lg font-semibold text-slate-900">
                {application.referenceNumber || "Not assigned"}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">
                Submitted
              </p>

              <p className="text-lg text-slate-900">
                {application.createdAt.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="text-xl font-bold text-slate-900">
              Application Decision
            </h2>

            <p className="mt-2 text-slate-600">
              Update the application status below.
            </p>

            <StatusButtons
              applicationId={application.id}
              currentStatus={application.status}
            />
          </div>
        </div>
      </div>
    </main>
  );
}