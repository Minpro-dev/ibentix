/*
  Warnings:

  - You are about to drop the column `categoryId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `couponId` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `couponId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `organizerProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[invoiceNumber]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paymentId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `availableSlot` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endSellingDate` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFree` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startSellingDate` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `events` table without a default value. This is not possible if the table is not empty.
  - Made the column `locationName` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `expireAt` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceNumber` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pointsUsed` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketQuantity` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `referralCoupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validFrom` to the `referralCoupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `validUntil` to the `referralCoupons` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('WAITING_FOR_PAYMENT', 'WAITING_FOR_ADMIN_CONFIRMATION', 'DONE', 'REJECTED', 'EXPIRED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "organizerProfile" DROP CONSTRAINT "organizerProfile_userId_fkey";

-- AlterTable
ALTER TABLE "eventCategories" ALTER COLUMN "categoryName" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "eventCoupons" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "couponCode" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "categoryId",
DROP COLUMN "couponId",
DROP COLUMN "endDate",
DROP COLUMN "name",
DROP COLUMN "startDate",
ADD COLUMN     "availableSlot" INTEGER NOT NULL,
ADD COLUMN     "endSellingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isFree" BOOLEAN NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "startSellingDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "locationName" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "couponId",
DROP COLUMN "quantity",
DROP COLUMN "status",
ADD COLUMN     "appCouponId" TEXT,
ADD COLUMN     "eventCouponId" TEXT,
ADD COLUMN     "expireAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "invoiceNumber" TEXT NOT NULL,
ADD COLUMN     "paymentId" TEXT,
ADD COLUMN     "pointsUsed" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "referralCouponId" TEXT,
ADD COLUMN     "ticketQuantity" INTEGER NOT NULL,
ALTER COLUMN "orderNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "points" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "referralCoupons" ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "validFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "validUntil" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "couponCode" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "generatedReferralCode" TEXT,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otp" TEXT,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3),
ALTER COLUMN "avatar" DROP NOT NULL;

-- DropTable
DROP TABLE "organizerProfile";

-- DropEnum
DROP TYPE "OrderStatus";

-- CreateTable
CREATE TABLE "payments" (
    "paymentId" TEXT NOT NULL,
    "paymentProof" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "paymentAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "payments_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "appCoupons" (
    "appCouponId" TEXT NOT NULL,
    "couponCode" TEXT NOT NULL,
    "totalCouponAvailable" INTEGER NOT NULL,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "discountAmount" DECIMAL(65,30) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appCoupons_pkey" PRIMARY KEY ("appCouponId")
);

-- CreateTable
CREATE TABLE "organizerProfiles" (
    "organizerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "organizerProfiles_pkey" PRIMARY KEY ("organizerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizerProfiles_userId_key" ON "organizerProfiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_invoiceNumber_key" ON "orders"("invoiceNumber");

-- CreateIndex
CREATE UNIQUE INDEX "orders_paymentId_key" ON "orders"("paymentId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("paymentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventCategories" ADD CONSTRAINT "eventCategories_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizerProfiles" ADD CONSTRAINT "organizerProfiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
