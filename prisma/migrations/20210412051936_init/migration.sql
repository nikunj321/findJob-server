-- CreateEnum
CREATE TYPE "Commitment" AS ENUM ('FULLTIME', 'PARTTIME');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "hashPass" VARCHAR NOT NULL,
    "role" TEXT NOT NULL DEFAULT E'user'
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "position" TEXT,
    "commitment" "Commitment",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company.id_unique" ON "Company"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Company.email_unique" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Job.id_unique" ON "Job"("id");

-- AddForeignKey
ALTER TABLE "Job" ADD FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
