-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "surface" DOUBLE PRECISION NOT NULL,
    "propertyType" TEXT,
    "condition" TEXT,
    "loanDuration" INTEGER,
    "interestRate" DOUBLE PRECISION,
    "monthlyPayment" DOUBLE PRECISION,
    "estimatedRent" DOUBLE PRECISION,
    "notaryFees" DOUBLE PRECISION,
    "renovationCost" DOUBLE PRECISION,
    "personalContribution" DOUBLE PRECISION,
    "rentalYield" DOUBLE PRECISION,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
