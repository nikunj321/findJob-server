/*
  Warnings:

  - Added the required column `commitment` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Commitment" AS ENUM ('FULLTIME', 'PARTTIME');

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "commitment" "Commitment" NOT NULL;
