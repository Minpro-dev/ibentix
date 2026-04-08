/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `referralCoupons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "referralCoupons_userId_key" ON "referralCoupons"("userId");
