/*
  Warnings:

  - You are about to drop the column `airQualityIndex` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `avgRentalYield` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `climateZone` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `coastalCity` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `crimeRate` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `dataQualityScore` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `economicGrowthRate` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `economicZone` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `investmentRating` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `marketTrend` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `numUniversities` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `tourismIndex` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `unemploymentRate` on the `City` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "City_avgRentalYield_idx";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "airQualityIndex",
DROP COLUMN "avgRentalYield",
DROP COLUMN "climateZone",
DROP COLUMN "coastalCity",
DROP COLUMN "crimeRate",
DROP COLUMN "dataQualityScore",
DROP COLUMN "economicGrowthRate",
DROP COLUMN "economicZone",
DROP COLUMN "investmentRating",
DROP COLUMN "lastUpdated",
DROP COLUMN "marketTrend",
DROP COLUMN "numUniversities",
DROP COLUMN "tourismIndex",
DROP COLUMN "unemploymentRate",
ADD COLUMN     "avgPriceAppartement" DOUBLE PRECISION,
ADD COLUMN     "avgPriceVilla" DOUBLE PRECISION,
ADD COLUMN     "investmentScore" DOUBLE PRECISION,
ADD COLUMN     "lastDataUpdate" TIMESTAMP(3),
ADD COLUMN     "yearlyPriceVariation" DOUBLE PRECISION,
ADD COLUMN     "yearlyTransactionVariation" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "PropertyTypeStats" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "priceVariation" DOUBLE PRECISION NOT NULL,
    "transactionVariation" DOUBLE PRECISION NOT NULL,
    "averagePrice" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyTypeStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketTrendStats" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "sales" INTEGER NOT NULL,
    "listings" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketTrendStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceHistoryStats" (
    "id" SERIAL NOT NULL,
    "cityId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "averagePrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceHistoryStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quartier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "averagePricePerSqm" DOUBLE PRECISION,
    "priceEvolution" DOUBLE PRECISION,
    "propertyCount" INTEGER,
    "investmentScore" DOUBLE PRECISION,
    "population" INTEGER,
    "medianAge" DOUBLE PRECISION,
    "incomeLevel" TEXT,
    "schoolCount" INTEGER,
    "parkCount" INTEGER,
    "shopCount" INTEGER,
    "transportCount" INTEGER,
    "demandLevel" TEXT,
    "avgDaysOnMarket" INTEGER,
    "minPrice" DOUBLE PRECISION,
    "maxPrice" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quartier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyTypeDistribution" (
    "id" SERIAL NOT NULL,
    "quartierId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "averagePrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyTypeDistribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PropertyTypeStats_cityId_idx" ON "PropertyTypeStats"("cityId");

-- CreateIndex
CREATE INDEX "PropertyTypeStats_type_idx" ON "PropertyTypeStats"("type");

-- CreateIndex
CREATE INDEX "MarketTrendStats_cityId_idx" ON "MarketTrendStats"("cityId");

-- CreateIndex
CREATE INDEX "MarketTrendStats_month_idx" ON "MarketTrendStats"("month");

-- CreateIndex
CREATE INDEX "PriceHistoryStats_cityId_idx" ON "PriceHistoryStats"("cityId");

-- CreateIndex
CREATE INDEX "PriceHistoryStats_year_idx" ON "PriceHistoryStats"("year");

-- CreateIndex
CREATE INDEX "Quartier_cityId_idx" ON "Quartier"("cityId");

-- CreateIndex
CREATE INDEX "Quartier_name_idx" ON "Quartier"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Quartier_cityId_name_key" ON "Quartier"("cityId", "name");

-- CreateIndex
CREATE INDEX "PropertyTypeDistribution_quartierId_idx" ON "PropertyTypeDistribution"("quartierId");

-- CreateIndex
CREATE INDEX "PropertyTypeDistribution_type_idx" ON "PropertyTypeDistribution"("type");

-- AddForeignKey
ALTER TABLE "PropertyTypeStats" ADD CONSTRAINT "PropertyTypeStats_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketTrendStats" ADD CONSTRAINT "MarketTrendStats_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceHistoryStats" ADD CONSTRAINT "PriceHistoryStats_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quartier" ADD CONSTRAINT "Quartier_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyTypeDistribution" ADD CONSTRAINT "PropertyTypeDistribution_quartierId_fkey" FOREIGN KEY ("quartierId") REFERENCES "Quartier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
