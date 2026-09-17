/*
  Warnings:

  - You are about to drop the column `userId` on the `Subscription` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkOrganizationId]` on the table `Workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SubscriptionStatus" ADD VALUE 'UPCOMING';
ALTER TYPE "SubscriptionStatus" ADD VALUE 'PAST_DUE';

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- DropIndex
DROP INDEX "Subscription_userId_idx";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "userId",
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "clerkOrganizationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_clerkOrganizationId_key" ON "Workspace"("clerkOrganizationId");
