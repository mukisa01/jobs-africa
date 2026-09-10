import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const referenceNumber = String(
      formData.get("referenceNumber") ?? ""
    ).trim();

    const transactionRef = String(
      formData.get("transactionRef") ?? ""
    ).trim();

    const proof = formData.get("proof");

    if (!referenceNumber || !transactionRef) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Application reference and transaction reference are required.",
        },
        { status: 400 }
      );
    }

    if (!(proof instanceof File) || proof.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload proof of payment.",
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
        applicantId: true,
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

    const extension = path.extname(proof.name).toLowerCase();

    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".pdf",
    ];

    if (!allowedExtensions.includes(extension)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid proof file. Please upload a JPG, PNG, WEBP, or PDF file.",
        },
        { status: 400 }
      );
    }

    const maxFileSize = 10 * 1024 * 1024;

    if (proof.size > maxFileSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment proof must be smaller than 10 MB.",
        },
        { status: 400 }
      );
    }

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "payments"
    );

    await mkdir(uploadDirectory, { recursive: true });

    const uniqueFileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 15)}${extension}`;

    const filePath = path.join(
      uploadDirectory,
      uniqueFileName
    );

    const bytes = await proof.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await writeFile(filePath, buffer);

    const proofPath = `/uploads/payments/${uniqueFileName}`;

    const existingRequest =
      await prisma.verificationRequest.findFirst({
        where: {
          userId: application.applicantId,
          status: "PENDING",
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    if (existingRequest) {
      await prisma.verificationRequest.update({
        where: {
          id: existingRequest.id,
        },
        data: {
          proofPath,
          amount: "3 USD",
          notes: `Transaction Reference: ${transactionRef}`,
          status: "PENDING",
          reviewedAt: null,
        },
      });
    } else {
      await prisma.verificationRequest.create({
        data: {
          proofPath,
          amount: "3 USD",
          status: "PENDING",
          notes: `Transaction Reference: ${transactionRef}`,
          userId: application.applicantId,
        },
      });
    }

    console.log(
      "PAYMENT PROOF SUBMITTED:",
      referenceNumber,
      transactionRef,
      proofPath
    );

    return NextResponse.json({
      success: true,
      message:
        "Payment submitted successfully. Your payment is awaiting verification.",
    });
  } catch (error) {
    console.error("Payment submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit payment. Please try again.",
      },
      { status: 500 }
    );
  }
}