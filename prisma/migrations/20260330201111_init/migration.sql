-- CreateEnum
CREATE TYPE "ServicesType" AS ENUM ('Recurrent', 'NonRecurrent');

-- CreateEnum
CREATE TYPE "OtpPurpose" AS ENUM ('signup', 'forgot_password');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "passwordHash" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "ownerId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "mileageInterval" INTEGER,
    "cost" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "type" "ServicesType" NOT NULL,
    "ownerId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailOtps" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "lastSentAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "purpose" "OtpPurpose" NOT NULL,
    "sendCount" INTEGER NOT NULL DEFAULT 1,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailOtps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "EmailOtps_email_purpose_idx" ON "EmailOtps"("email", "purpose");

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
