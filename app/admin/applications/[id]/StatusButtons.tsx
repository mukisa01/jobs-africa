"use client";

import { useState } from "react";

type StatusButtonsProps = {
  applicationId: number;
  currentStatus: string;
};

export default function StatusButtons({
  applicationId,
  currentStatus,
}: StatusButtonsProps) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: "Approved" | "Rejected") {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/applications/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: applicationId,
          status: newStatus,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus(newStatus);
      } else {
        alert(result.message || "Failed to update status.");
      }
    } catch {
      alert("Something went wrong while updating the status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <div className="mb-4">
        <p className="text-sm font-semibold text-slate-500">
          Current Status
        </p>

        <span
          className={`mt-2 inline-block rounded-full px-4 py-2 text-sm font-bold ${
            status === "Approved"
              ? "bg-green-100 text-green-800"
              : status === "Rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => updateStatus("Approved")}
          disabled={loading || status === "Approved"}
          className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && status !== "Approved"
            ? "Updating..."
            : "Approve Application"}
        </button>

        <button
          type="button"
          onClick={() => updateStatus("Rejected")}
          disabled={loading || status === "Rejected"}
          className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && status !== "Rejected"
            ? "Updating..."
            : "Reject Application"}
        </button>
      </div>
    </div>
  );
}