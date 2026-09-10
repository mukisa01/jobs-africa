import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (session?.value !== "authenticated") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const applicationId = Number(body.applicationId);

    if (!Number.isInteger(applicationId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application ID.",
        },
        { status: 400 }
      );
    }

    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        User: true,
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

    const verificationRequest =
      await prisma.verificationRequest.findFirst({
        where: {
          userId: application.applicantId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (!verificationRequest) {
      return NextResponse.json(
        {
          success: false,
          message: "No payment proof has been submitted by this applicant.",
        },
        { status: 400 }
      );
    }

    if (verificationRequest.status === "VERIFIED") {
      return NextResponse.json({
        success: true,
        message: "Payment has already been verified.",
        application,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const verification = await tx.verificationRequest.update({
        where: {
          id: verificationRequest.id,
        },
        data: {
          status: "VERIFIED",
          reviewedAt: new Date(),
        },
      });

      const user = await tx.user.update({
        where: {
          id: application.applicantId,
        },
        data: {
          verificationStatus: "VERIFIED",
        },
      });

      return {
        verification,
        user,
      };
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully.",
      application,
      verification: result.verification,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to verify payment.",
      },
      { status: 500 }
    );
  }
}