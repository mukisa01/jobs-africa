import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = body.username;
    const password = body.password;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (
      username === adminUsername &&
      password === adminPassword
    ) {
      const response = NextResponse.json({
        success: true,
        message: "Login successful",
      });

      response.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid username or password.",
      },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request.",
      },
      { status: 400 }
    );
  }
}