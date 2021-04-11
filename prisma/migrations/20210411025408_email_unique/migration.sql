/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Company.id_unique";

-- AlterTable
ALTER TABLE "Company" ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Company.email_unique" ON "Company"("email");
