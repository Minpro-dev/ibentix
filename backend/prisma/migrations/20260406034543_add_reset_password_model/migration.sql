/*
  Warnings:

  - Added the required column `updatedAt` to the `refreshTokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "refreshTokens" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "resetPasswords" (
    "resetPasswordId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "resetPasswords_pkey" PRIMARY KEY ("resetPasswordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "resetPasswords_hashedToken_key" ON "resetPasswords"("hashedToken");

-- AddForeignKey
ALTER TABLE "resetPasswords" ADD CONSTRAINT "resetPasswords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
