-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "plataformEmail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "pix_key" TEXT NOT NULL,
    "pix_received" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_plataformEmail_key" ON "users"("plataformEmail");
