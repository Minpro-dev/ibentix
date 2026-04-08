/*
  Warnings:

  - You are about to drop the column `pointType` on the `points` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "points" DROP COLUMN "pointType",
ADD COLUMN     "orderId" TEXT;

-- DropEnum
DROP TYPE "PointType";

-- AddForeignKey
ALTER TABLE "points" ADD CONSTRAINT "points_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE SET NULL ON UPDATE CASCADE;
