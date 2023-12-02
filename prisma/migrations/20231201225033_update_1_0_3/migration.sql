-- AlterTable
ALTER TABLE "AuditLog" ALTER COLUMN "userImage" DROP NOT NULL,
ALTER COLUMN "userName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "archive" BOOLEAN NOT NULL DEFAULT false;
