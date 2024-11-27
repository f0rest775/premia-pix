/*
  Warnings:

  - Added the required column `page_name` to the `trackings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trackings" ADD COLUMN     "page_name" TEXT NOT NULL;
