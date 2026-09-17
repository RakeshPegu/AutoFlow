/*
  Warnings:

  - The `reason` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusTypes" AS ENUM ('PENDING', 'RECEIVED');

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "classification" DROP NOT NULL,
DROP COLUMN "reason",
ADD COLUMN     "reason" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "status",
ADD COLUMN     "status" "StatusTypes" NOT NULL DEFAULT 'PENDING';
