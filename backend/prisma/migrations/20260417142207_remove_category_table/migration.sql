/*
  Warnings:

  - You are about to drop the `eventCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('MUSIC', 'NIGHTLIFE', 'WORKSHOP', 'CONFERENCE', 'EXHIBITION', 'SPORTS', 'FESTIVAL', 'COMMUNITY', 'OTHER');

-- DropForeignKey
ALTER TABLE "eventCategories" DROP CONSTRAINT "eventCategories_eventId_fkey";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "category" "EventCategory" NOT NULL DEFAULT 'OTHER';

-- DropTable
DROP TABLE "eventCategories";
