/*
  Warnings:

  - The primary key for the `eventCoupons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `couponId` on the `eventCoupons` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `eventCoupons` table. All the data in the column will be lost.
  - You are about to alter the column `couponCode` on the `eventCoupons` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to drop the column `orderNumber` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `points` table. All the data in the column will be lost.
  - The primary key for the `referralCoupons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `referralId` on the `referralCoupons` table. All the data in the column will be lost.
  - You are about to drop the column `generatedReferralCode` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `pointsId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `referralCode` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `eventCoupons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ticketCode]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[myReferralCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `eventCouponId` was added to the `eventCoupons` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `pointType` to the `points` table without a default value. This is not possible if the table is not empty.
  - The required column `referralCouponId` was added to the `referralCoupons` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `title` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `reviews` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `status` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketCode` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `myReferralCode` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('ACTIVE', 'USED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PointType" AS ENUM ('EARNED', 'REDEEMED', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_organizerId_fkey";

-- DropIndex
DROP INDEX "organizerProfiles_userId_key";

-- DropIndex
DROP INDEX "users_referralCode_key";

-- AlterTable
ALTER TABLE "appCoupons" ADD COLUMN     "usedCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "totalCouponAvailable" DROP NOT NULL;

-- AlterTable
ALTER TABLE "eventCoupons" DROP CONSTRAINT "eventCoupons_pkey",
DROP COLUMN "couponId",
DROP COLUMN "userId",
ADD COLUMN     "eventCouponId" TEXT NOT NULL,
ALTER COLUMN "couponCode" SET DATA TYPE VARCHAR(20),
ADD CONSTRAINT "eventCoupons_pkey" PRIMARY KEY ("eventCouponId");

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "orderNumber";

-- AlterTable
ALTER TABLE "points" DROP COLUMN "isActive",
ADD COLUMN     "pointType" "PointType" NOT NULL;

-- AlterTable
ALTER TABLE "referralCoupons" DROP CONSTRAINT "referralCoupons_pkey",
DROP COLUMN "referralId",
ADD COLUMN     "referralCouponId" TEXT NOT NULL,
ADD CONSTRAINT "referralCoupons_pkey" PRIMARY KEY ("referralCouponId");

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "status" "TicketStatus" NOT NULL,
ADD COLUMN     "ticketCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "generatedReferralCode",
DROP COLUMN "pointsId",
DROP COLUMN "referralCode",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "myReferralCode" TEXT NOT NULL,
ADD COLUMN     "usedReferralCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "eventCoupons_eventId_key" ON "eventCoupons"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_ticketCode_key" ON "tickets"("ticketCode");

-- CreateIndex
CREATE UNIQUE INDEX "users_myReferralCode_key" ON "users"("myReferralCode");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_eventCouponId_fkey" FOREIGN KEY ("eventCouponId") REFERENCES "eventCoupons"("eventCouponId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_appCouponId_fkey" FOREIGN KEY ("appCouponId") REFERENCES "appCoupons"("appCouponId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_referralCouponId_fkey" FOREIGN KEY ("referralCouponId") REFERENCES "referralCoupons"("referralCouponId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "organizerProfiles"("organizerId") ON DELETE RESTRICT ON UPDATE CASCADE;
