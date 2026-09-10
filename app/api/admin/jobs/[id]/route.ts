import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const jobId = Number(id);

    if (!Number.isInteger(jobId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid job ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const title = String(body.title ?? "").trim();
    const category = String(body.category ?? "").trim();
    const skills = String(body.skills ?? "").trim();
    const qualification = String(body.qualification ?? "").trim();
    const location = String(body.location ?? "").trim();
    const budget = String(body.budget ?? "").trim();
    const description = String(body.description ?? "").trim();

    const remote =
      body.remote === true ||
      body.remote === "true" ||
      body.type === "Remote";

    if (
      !title ||
      !category ||
      !skills ||
      !qualification ||
      !description
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill in the title, category, skills, qualification, and description.",
        },
        { status: 400 }
      );
    }

    const job = await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        title,
        category,
        skills,
        qualification,
        location: location || null,
        budget: budget || null,
        remote,
        description,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error("Update job error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update job.",
      },
      { status: 500 }
    );
  }
}