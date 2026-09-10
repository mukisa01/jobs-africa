import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PaymentForm from "./PaymentForm";

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;

  const application = await prisma.application.findUnique({
    where: {
      referenceNumber: reference,
    },
    select: {
      referenceNumber: true,
      User: {
        select: {
          fullName: true,
          email: true,
        },
      },
    },
  });

  if (!application || !application.referenceNumber) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <a
          href="/jobs"
          className="mb-6 inline-block font-semibold text-emerald-700 hover:text-emerald-800"
        >
          ← Back to Jobs
        </a>

        <div className="rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-slate-900">
            Complete Verification Payment
          </h1>

          <p className="mt-3 text-slate-600">
            Hello{" "}
            <strong>{application.User.fullName}</strong>. Complete the $3
            verification payment and submit your transaction reference and
            proof of payment below.
          </p>

          <div className="mt-6 rounded-lg bg-emerald-50 p-4">
            <p className="font-semibold text-slate-700">
              Application Reference
            </p>

            <p className="mt-1 font-bold text-emerald-700">
              {application.referenceNumber}
            </p>

            <p className="mt-4 font-semibold text-slate-700">
              Email
            </p>

            <p className="mt-1 text-slate-900">
              {application.User.email}
            </p>

            <p className="mt-4 font-semibold text-slate-700">
              Verification Fee
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              $3 USD
            </p>
          </div>

          <PaymentForm
            referenceNumber={application.referenceNumber}
          />
        </div>
      </div>
    </main>
  );
}