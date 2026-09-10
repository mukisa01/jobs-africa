import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const jobs = await prisma.job.createMany({
      data: [
        {
          title: "Graphic Designer",
          description:
            "Create posters, social media graphics and other digital designs for clients.",
          category: "Design",
          skills: "Canva, Photoshop, Graphic Design",
          qualification: "UCE or above",
          location: "Kampala",
          remote: true,
          budget: "$30-$100",
          clientId: 2,
        },
        {
          title: "Data Entry Assistant",
          description:
            "Enter and organize information using Microsoft Excel and other office tools.",
          category: "Data Entry",
          skills: "Microsoft Excel, Data Entry, Typing",
          qualification: "UCE or above",
          location: "Uganda",
          remote: true,
          budget: "$20-$80",
          clientId: 2,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "2 new jobs created successfully.",
      count: jobs.count,
    });
  } catch (error) {
    console.error("SEED JOBS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create jobs.",
      },
      { status: 500 }
    );
  }
}