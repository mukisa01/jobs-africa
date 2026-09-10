-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "cvFileName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
