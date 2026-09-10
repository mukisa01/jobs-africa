import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "jobs-africa-development-secret"
);

export async function requireAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("jobs_africa_session")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "ADMIN") {
      redirect("/login");
    }

    return payload;
  } catch {
    redirect("/login");
  }
}