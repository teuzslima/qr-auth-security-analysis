-- CreateEnum
CREATE TYPE "GeneratedContractStatus" AS ENUM ('DRAFT', 'SIGNED');

-- CreateTable
CREATE TABLE "GeneratedContract" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "status" "GeneratedContractStatus" NOT NULL DEFAULT 'DRAFT',
    "signerName" TEXT,
    "signerCpf" TEXT,
    "signerIp" TEXT,
    "documentHash" TEXT,
    "signedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedContract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedContract_token_key" ON "GeneratedContract"("token");

