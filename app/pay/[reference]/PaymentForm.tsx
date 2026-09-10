"use client";

import { useState } from "react";

export default function PaymentForm({
  referenceNumber,
}: {
  referenceNumber: string;
}) {
  const [transactionRef, setTransactionRef] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    if (!proof) {
      setError("Please upload proof of payment.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("referenceNumber", referenceNumber);
      formData.append("transactionRef", transactionRef.trim());
      formData.append("proof", proof);

      const response = await fetch("/api/applications/payment", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setMessage(result.message);
        setTransactionRef("");
        setProof(null);

        const fileInput = document.getElementById(
          "proof"
        ) as HTMLInputElement | null;

        if (fileInput) {
          fileInput.value = "";
        }
      } else {
        setError(result.message || "Unable to submit payment.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 rounded-xl border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900">
        Submit Payment
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        After completing your $3 verification payment through the official
        Airtel Money payment process, enter your transaction reference and
        upload proof of payment.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="transactionRef"
            className="mb-2 block font-semibold text-slate-700"
          >
            Airtel Money Transaction Reference
          </label>

          <input
            id="transactionRef"
            type="text"
            value={transactionRef}
            onChange={(e) => setTransactionRef(e.target.value)}
            required
            placeholder="Enter transaction reference"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
          />
        </div>

        <div>
          <label
            htmlFor="proof"
            className="mb-2 block font-semibold text-slate-700"
          >
            Proof of Payment
          </label>

          <input
            id="proof"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setProof(e.target.files?.[0] ?? null)}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
          />

          <p className="mt-2 text-sm text-slate-500">
            Upload a screenshot, photo, or PDF showing your payment.
            Maximum size: 10 MB.
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 font-semibold text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-lg bg-green-50 p-4 font-semibold text-green-700">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Payment"}
        </button>
      </form>
    </div>
  );
}