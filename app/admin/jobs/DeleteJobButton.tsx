"use client";

import { useState } from "react";

export default function DeleteJobButton({
  jobId,
}: {
  jobId: number;
}) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        window.location.reload();
      } else {
        alert(result.message || "Failed to delete job.");
      }
    } catch {
      alert("Something went wrong while deleting the job.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}