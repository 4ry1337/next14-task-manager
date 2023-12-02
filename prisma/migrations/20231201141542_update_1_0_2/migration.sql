/*
  Warnings:

  - You are about to drop the column `orgId` on the `AuditLog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[workspaceId]` on the table `AuditLog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workspaceId` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "ENTITY_TYPE" ADD VALUE 'WORKSPACE';

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "orgId",
ADD COLUMN     "workspaceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AuditLog_workspaceId_key" ON "AuditLog"("workspaceId");

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
