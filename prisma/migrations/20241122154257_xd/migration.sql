/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "black_list" (
    "id" TEXT NOT NULL,
    "pix_key" TEXT NOT NULL,
    "pix_received" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "black_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "black_list_pix_key_key" ON "black_list"("pix_key");
