"use client";

export default function LogoutButton() {
  async function handleLogout() {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    window.location.href = "/admin/login";
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
    >
      Logout
    </button>
  );
}