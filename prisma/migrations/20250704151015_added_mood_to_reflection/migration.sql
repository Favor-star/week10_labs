/*
  Warnings:

  - Added the required column `mood` to the `Reflection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reflection" ADD COLUMN     "mood" TEXT NOT NULL;
