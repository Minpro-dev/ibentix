/*
  Warnings:

  - You are about to drop the column `usedAt` on the `eventCoupons` table. All the data in the column will be lost.
  - You are about to drop the column `expireAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventCoupons" DROP COLUMN "usedAt";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "expireAt",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "expiresAt",
ALTER COLUMN "paymentStatus" SET DEFAULT 'WAITING_FOR_PAYMENT';

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "status";

-- DropEnum
DROP TYPE "TicketStatus";
