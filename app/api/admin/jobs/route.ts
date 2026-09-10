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

    const clientId = Number(body.clientId);

    if (
      !title ||
      !category ||
      !skills ||
      !qualification ||
      !description ||
      !Number.isInteger(clientId)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide the title, category, skills, qualification, description, and a valid client.",
        },
        { status: 400 }
      );
    }

    const client = await prisma.user.findUnique({
      where: {
        id: clientId,
      },
    });

    if (!client) {
      return NextResponse.json(
        {
          success: false,
          message: "The selected client does not exist.",
        },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        skills,
        qualification,
        location: location || null,
        remote,
        budget: budget || null,
        clientId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Job created successfully.",
        job,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create job error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create job.",
      },
      { status: 500 }
    );
  }
}