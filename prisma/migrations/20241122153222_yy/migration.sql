/*
  Warnings:

  - You are about to drop the column `plataformEmail` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[plataform_email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `plataform_email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_plataformEmail_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "plataformEmail",
ADD COLUMN     "plataform_email" TEXT NOT NULL,
ALTER COLUMN "pix_key" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_plataform_email_key" ON "users"("plataform_email");
