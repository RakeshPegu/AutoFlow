/*
  Warnings:

  - The `periodEnd` column on the `Subscription` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `periodStart` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "periodStart",
ADD COLUMN     "periodStart" TIMESTAMP(3) NOT NULL,
DROP COLUMN "periodEnd",
ADD COLUMN     "periodEnd" TIMESTAMP(3);
