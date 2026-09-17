-- AlterTable
ALTER TABLE "WorkspaceMember" ADD COLUMN     "totalToken" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "usedTokens" INTEGER NOT NULL DEFAULT 0;
