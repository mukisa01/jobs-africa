"use client";

import { useState } from "react";

export default function VerifyPaymentButton({
  applicationId,
}: {
  applicationId: number;
}) {
  const [loading, setLoading] = useState(false);

  async function verifyPayment() {
    const confirmed = window.confirm(
      "Have you actually confirmed this Airtel Money transaction before marking it as paid?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicationId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        window.location.reload();
      } else {
        alert(result.message || "Payment verification failed.");
      }
    } catch {
      alert("Something went wrong while verifying the payment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={verifyPayment}
      disabled={loading}
      className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Verifying..." : "Verify Payment"}
    </button>
  );
}