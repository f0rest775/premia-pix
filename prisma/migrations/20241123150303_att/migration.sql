/*
  Warnings:

  - You are about to drop the column `pix_received` on the `black_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "black_list" DROP COLUMN "pix_received",
ADD COLUMN     "plataform" TEXT;
