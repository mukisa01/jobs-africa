/*
  Warnings:

  - A unique constraint covering the columns `[referenceNumber]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "referenceNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Application_referenceNumber_key" ON "Application"("referenceNumber");
