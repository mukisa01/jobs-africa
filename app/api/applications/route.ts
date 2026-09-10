import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jwtVerify } from "jose";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "jobs-africa-development-secret"
);

export async function POST(request: Request) {
  try {
    // ---------------------------------------
    // 1. CHECK LOGIN SESSION
    // ---------------------------------------
    const cookieHeader = request.headers.get("cookie") || "";

    const sessionMatch = cookieHeader.match(
      /jobs_africa_session=([^;]+)/
    );

    if (!sessionMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Please log in before applying for a job.",
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

    const applicantId = Number(payload.userId);

    if (!applicantId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid user session.",
        },
        { status: 401 }
      );
    }

    // ---------------------------------------
    // 2. READ FORM DATA
    // ---------------------------------------
    const formData = await request.formData();

    const jobId = Number(formData.get("jobId"));

    const fullName = String(
      formData.get("fullName") ?? ""
    ).trim();

    const email = String(
      formData.get("email") ?? ""
    ).trim();

    const phone = String(
      formData.get("phone") ?? ""
    ).trim();

    const education = String(
      formData.get("education") ?? ""
    ).trim();

    const skills = String(
      formData.get("skills") ?? ""
    ).trim();

    const coverLetter = String(
      formData.get("coverLetter") ?? ""
    ).trim();

    const cv = formData.get("cv");

    // ---------------------------------------
    // 3. VALIDATE REQUIRED FIELDS
    // ---------------------------------------
    if (
      !jobId ||
      !fullName ||
      !email ||
      !phone ||
      !education ||
      !skills ||
      !coverLetter
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // ---------------------------------------
    // 4. FIND APPLICANT
    // ---------------------------------------
    const applicant = await prisma.user.findUnique({
      where: {
        id: applicantId,
      },
    });

    if (!applicant) {
      return NextResponse.json(
        {
          success: false,
          message: "User account not found.",
        },
        { status: 404 }
      );
    }

    // ---------------------------------------
    // 5. FIND JOB
    // ---------------------------------------
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
    });

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "The selected job could not be found.",
        },
        { status: 404 }
      );
    }

    // ---------------------------------------
    // 6. CHECK FOR DUPLICATE APPLICATION
    // ---------------------------------------
    const existingApplication =
      await prisma.application.findUnique({
        where: {
          jobId_applicantId: {
            jobId,
            applicantId,
          },
        },
      });

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already applied for this job.",
          referenceNumber:
            existingApplication.referenceNumber,
        },
        { status: 409 }
      );
    }

    // ---------------------------------------
    // 7. HANDLE CV UPLOAD
    // ---------------------------------------
    let cvPath: string | null = null;

    if (cv instanceof File && cv.size > 0) {
      const extension = path
        .extname(cv.name)
        .toLowerCase();

      const allowedExtensions = [
        ".pdf",
        ".doc",
        ".docx",
      ];

      if (!allowedExtensions.includes(extension)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid CV file. Please upload a PDF, DOC, or DOCX file.",
          },
          { status: 400 }
        );
      }

      const maxFileSize = 10 * 1024 * 1024;

      if (cv.size > maxFileSize) {
        return NextResponse.json(
          {
            success: false,
            message: "CV must be smaller than 10 MB.",
          },
          { status: 400 }
        );
      }

      const uploadDirectory = path.join(
        process.cwd(),
        "public",
        "uploads",
        "cvs"
      );

      await mkdir(uploadDirectory, {
        recursive: true,
      });

      const uniqueFileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}${extension}`;

      const filePath = path.join(
        uploadDirectory,
        uniqueFileName
      );

      const bytes = await cv.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await writeFile(filePath, buffer);

      cvPath = `/uploads/cvs/${uniqueFileName}`;

      console.log("CV SAVED:", cvPath);
    }

    // ---------------------------------------
    // 8. CREATE APPLICATION
    // ---------------------------------------
    const referenceNumber = `JA-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase()}`;

    const application = await prisma.application.create({
      data: {
        referenceNumber,
        coverLetter,
        phone,
        cvPath,
        status: "SUBMITTED",
        jobId,
        applicantId,
      },
    });

    // ---------------------------------------
    // 9. UPDATE STUDENT PROFILE
    // ---------------------------------------
    // We update the student's name, qualification
    // and skills, but NOT their email.
    //
    // Email is unique in the database, so changing it
    // here could cause a duplicate-email error.
    await prisma.user.update({
      where: {
        id: applicantId,
      },
      data: {
        fullName,
        qualification: education,
        skills,
      },
    });

    // ---------------------------------------
    // 10. LOG SUCCESS
    // ---------------------------------------
    console.log(
      "APPLICATION SAVED:",
      application.id
    );

    console.log(
      "REFERENCE NUMBER:",
      application.referenceNumber
    );

    console.log(
      "APPLICANT:",
      applicantId
    );

    console.log(
      "JOB:",
      jobId
    );

    console.log(
      "PHONE:",
      phone
    );

    console.log(
      "CV:",
      cvPath || "No CV uploaded"
    );

    // ---------------------------------------
    // 11. RETURN SUCCESS
    // ---------------------------------------
    return NextResponse.json(
      {
        success: true,
        message:
          "Application submitted successfully!",
        applicationId: application.id,
        referenceNumber:
          application.referenceNumber,
        phone,
        cvPath,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "APPLICATION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to submit application. Please try again.",
      },
      { status: 500 }
    );
  }
}