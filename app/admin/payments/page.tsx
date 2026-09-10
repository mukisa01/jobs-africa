import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminPaymentsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session?.value !== "authenticated") {
    redirect("/admin/login");
  }

  const payments = await prisma.verificationRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      User: true,
    },
  });

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Payment Verification
            </h1>

            <p className="mt-2 text-slate-600">
              Review submitted Jobs Africa verification payments.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/applications"
              className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Applications
            </a>

            <a
              href="/admin/jobs"
              className="rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              Manage Jobs
            </a>
          </div>
        </div>

        {payments.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-2xl font-bold text-slate-900">
              No payment submissions yet
            </h2>

            <p className="mt-3 text-slate-600">
              When a student submits a verification payment, it will appear
              here for review.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white shadow">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Payment Proof</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Submitted</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-200"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">
                          {payment.User.fullName}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {payment.User.email}
                      </td>

                      <td className="px-6 py-4 font-bold text-slate-900">
                        ${payment.amount}
                      </td>

                      <td className="px-6 py-4">
                        <a
                          href={payment.proofPath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-blue-600 hover:underline"
                        >
                          View Payment Proof
                        </a>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            payment.status === "VERIFIED"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "REJECTED"
                                ? "bg-red-100 text-red-800"
                                : payment.status === "NEEDS_INFO"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {payment.createdAt.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}