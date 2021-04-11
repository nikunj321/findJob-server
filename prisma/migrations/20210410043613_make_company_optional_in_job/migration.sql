-- DropIndex
DROP INDEX "Company.email_unique";

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "companyId" DROP NOT NULL;
