/*
  Warnings:

  - A unique constraint covering the columns `[couponCode]` on the table `appCoupons` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "appCoupons_couponCode_key" ON "appCoupons"("couponCode");
