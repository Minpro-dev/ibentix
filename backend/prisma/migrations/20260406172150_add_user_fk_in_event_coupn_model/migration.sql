/*
  Warnings:

  - Added the required column `userId` to the `eventCoupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventCoupons" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "eventCoupons" ADD CONSTRAINT "eventCoupons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
