import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const referenceNumber = searchParams.get("reference")?.trim();

    if (!referenceNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your application reference number.",
        },
        { status: 400 }
      );
    }

    const application = await prisma.application.findUnique({
      where: {
        referenceNumber,
      },
      select: {
        id: true,
        referenceNumber: true,
        status: true,
        coverLetter: true,
        phone: true,
        cvPath: true,
        createdAt: true,
        User: {
          select: {
            fullName: true,
            email: true,
            qualification: true,
            skills: true,
          },
        },
        job: {
          select: {
            title: true,
            category: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "No application was found with that reference number.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Application tracking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to track application.",
      },
      { status: 500 }
    );
  }
}