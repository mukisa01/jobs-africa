-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentStatus" TEXT NOT NULL DEFAULT 'Pending',
ADD COLUMN     "transactionRef" TEXT,
ADD COLUMN     "verificationFee" DOUBLE PRECISION NOT NULL DEFAULT 3;
