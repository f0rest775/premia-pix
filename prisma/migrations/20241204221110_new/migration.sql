-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('ERROR', 'PENDING', 'APPROVED', 'CHARGEBACK', 'PROCESSING', 'REFUSED', 'REFUNDED');

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "status" "SaleStatus" NOT NULL DEFAULT 'PROCESSING',
    "amount" INTEGER NOT NULL,
    "external_id" TEXT,
    "br_code" TEXT,
    "approved_at" TIMESTAMP(3),
    "refunded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_path_key" ON "sales"("path");

-- CreateIndex
CREATE UNIQUE INDEX "sales_external_id_key" ON "sales"("external_id");
