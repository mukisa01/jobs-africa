import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import DeleteJobButton from "./DeleteJobButton";

export default async function AdminJobsPage() {
  // Protect this page — only logged-in ADMIN users can access it
  await requireAdmin();

  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      User: true,
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Jobs
          </h1>

          <p className="mt-2 text-gray-600">
            View and manage all jobs posted on Jobs Africa.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow">
            <p className="text-gray-600">
              No jobs have been posted yet.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Job
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Client
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Category
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Location
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Budget
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Deadline
                    </th>

                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 bg-white">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      {/* Job */}
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {job.title}
                        </div>

                        <div className="mt-1 max-w-xs truncate text-sm text-gray-500">
                          {job.description}
                        </div>
                      </td>

                      {/* Client */}
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {job.User?.fullName || "Unknown Client"}
                        </div>

                        <div className="text-sm text-gray-500">
                          Client ID: {job.clientId}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {job.category}
                      </td>

                      {/* Location */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {job.remote
                          ? "Remote"
                          : job.location || "Not specified"}
                      </td>

                      {/* Budget */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {job.budget || "Not specified"}
                      </td>

                      {/* Deadline */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                        {job.deadline
                          ? new Date(job.deadline).toLocaleDateString()
                          : "No deadline"}
                      </td>

                      {/* Action */}
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <DeleteJobButton jobId={job.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          Total jobs: {jobs.length}
        </div>
      </div>
    </main>
  );
}