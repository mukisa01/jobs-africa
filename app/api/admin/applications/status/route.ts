import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "jobs-africa-development-secret"
);

export async function POST(request: Request) {
  try {
    // Check admin session
    const cookieHeader = request.headers.get("cookie") || "";

    const sessionMatch = cookieHeader.match(
      /jobs_africa_session=([^;]+)/
    );

    if (!sessionMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Please log in as an administrator.",
        },
        { status: 401 }
      );
    }

    const token = sessionMatch[1];

    let payload;

    try {
      const result = await jwtVerify(token, secret);
      payload = result.payload;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Your session has expired. Please log in again.",
        },
        { status: 401 }
      );
    }

    // Only administrators can change application status
    if (payload.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          message: "Administrator access required.",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const applicationId = Number(body.applicationId);
    const status = String(body.status ?? "").trim();

    if (!applicationId || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID and status are required.",
        },
        { status: 400 }
      );
    }

    const allowedStatuses = [
      "SUBMITTED",
      "REVIEWING",
      "SHORTLISTED",
      "ACCEPTED",
      "REJECTED",
    ];

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application status.",
        },
        { status: 400 }
      );
    }

    // Make sure the application exists
    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found.",
        },
        { status: 404 }
      );
    }

    // Update only the Application fields
    const updatedApplication =
      await prisma.application.update({
        where: {
          id: applicationId,
        },
        data: {
          status: status as
            | "SUBMITTED"
            | "REVIEWING"
            | "SHORTLISTED"
            | "ACCEPTED"
            | "REJECTED",
        },
      });

    console.log(
      "APPLICATION STATUS UPDATED:",
      updatedApplication.id,
      updatedApplication.status
    );

    return NextResponse.json({
      success: true,
      message: "Application status updated successfully.",
      application: {
        id: updatedApplication.id,
        referenceNumber:
          updatedApplication.referenceNumber,
        status: updatedApplication.status,
      },
    });
  } catch (error) {
    console.error(
      "APPLICATION STATUS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update application status.",
      },
      { status: 500 }
    );
  }
}