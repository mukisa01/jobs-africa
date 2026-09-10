import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditJobForm from "./EditJobForm";

export default async function EditJobPage({
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

  const jobId = Number(id);

  if (!Number.isInteger(jobId)) {
    notFound();
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
    include: {
      User: true,
    },
  });

  if (!job) {
    notFound();
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
            Edit Job
          </h1>

          <p className="mt-2 text-slate-600">
            Update the job details below.
          </p>

          <div className="mt-8">
            <EditJobForm
              job={{
                id: job.id,
                title: job.title,
                company: job.User?.fullName || "Unknown Client",
                category: job.category,
                location: job.location || "",
                budget: job.budget || "",
                type: job.remote ? "Remote" : "On-site",
                description: job.description,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}