/*
  Warnings:

  - You are about to drop the column `totalToken` on the `WorkspaceMember` table. All the data in the column will be lost.
  - You are about to drop the column `usedTokens` on the `WorkspaceMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "totalToken" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "usedTokens" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "WorkspaceMember" DROP COLUMN "totalToken",
DROP COLUMN "usedTokens";
