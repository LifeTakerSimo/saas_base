-- CreateTable
CREATE TABLE "PropertyType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "cityName" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "avgPricePerSqm" DOUBLE PRECISION,
    "avgRentalYield" DOUBLE PRECISION,
    "population" INTEGER,
    "economicZone" TEXT,
    "unemploymentRate" DOUBLE PRECISION,
    "tourismIndex" DOUBLE PRECISION,
    "economicGrowthRate" DOUBLE PRECISION,
    "coastalCity" BOOLEAN NOT NULL DEFAULT false,
    "crimeRate" DOUBLE PRECISION,
    "numUniversities" INTEGER,
    "airQualityIndex" DOUBLE PRECISION,
    "climateZone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastUpdated" TIMESTAMP(3),
    "dataSource" TEXT,
    "dataQualityScore" DOUBLE PRECISION,
    "marketTrend" TEXT,
    "investmentRating" TEXT,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "surface" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "condition" TEXT,
    "propertyTypeId" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Maroc',
    "regionId" INTEGER NOT NULL,
    "quartier" TEXT,
    "address" TEXT,
    "postalCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "distanceToCenter" DOUBLE PRECISION,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "features" TEXT[],
    "imageUrl" TEXT NOT NULL,
    "images" TEXT[],
    "pricePerSquareMeter" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "neighborhoodPrice" DOUBLE PRECISION,
    "rentalPotential" TEXT,
    "annualPriceChange" DOUBLE PRECISION,
    "priceEvolutionHistory" JSONB,
    "suggestedRent" DOUBLE PRECISION,
    "grossYield" DOUBLE PRECISION,
    "cityYield" DOUBLE PRECISION,
    "link" TEXT,
    "site" TEXT,
    "createdBy" TEXT,
    "modifiedBy" TEXT,
    "modifiedAt" TIMESTAMP(3),
    "sell" BOOLEAN NOT NULL DEFAULT true,
    "longTerm" BOOLEAN NOT NULL DEFAULT false,
    "projectId" TEXT,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "tauxActivite" DECIMAL(5,2),
    "populationActiveMille" INTEGER,
    "tauxEmploi" DECIMAL(5,2),
    "populationActiveOccupeeMille" INTEGER,
    "tauxSousEmploi" DECIMAL(5,2),
    "populationSousEmploiMille" INTEGER,
    "chomageMille" INTEGER,
    "tauxChomage" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dataSource" TEXT,
    "lastDataUpdate" TIMESTAMP(3),

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "searchQuery" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "frequency" TEXT NOT NULL,
    "lastSent" TIMESTAMP(3),
    "emailSent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyType_name_key" ON "PropertyType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "City_cityName_key" ON "City"("cityName");

-- CreateIndex
CREATE INDEX "City_cityName_idx" ON "City"("cityName");

-- CreateIndex
CREATE INDEX "City_regionId_idx" ON "City"("regionId");

-- CreateIndex
CREATE INDEX "City_avgPricePerSqm_idx" ON "City"("avgPricePerSqm");

-- CreateIndex
CREATE INDEX "City_avgRentalYield_idx" ON "City"("avgRentalYield");

-- CreateIndex
CREATE INDEX "Property_cityId_idx" ON "Property"("cityId");

-- CreateIndex
CREATE INDEX "Property_propertyTypeId_idx" ON "Property"("propertyTypeId");

-- CreateIndex
CREATE INDEX "Property_price_idx" ON "Property"("price");

-- CreateIndex
CREATE INDEX "Property_surface_idx" ON "Property"("surface");

-- CreateIndex
CREATE INDEX "Property_status_idx" ON "Property"("status");

-- CreateIndex
CREATE INDEX "Property_regionId_idx" ON "Property"("regionId");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE INDEX "Region_year_idx" ON "Region"("year");

-- CreateIndex
CREATE INDEX "Region_tauxChomage_idx" ON "Region"("tauxChomage");

-- CreateIndex
CREATE INDEX "Region_tauxActivite_idx" ON "Region"("tauxActivite");

-- CreateIndex
CREATE INDEX "Region_name_idx" ON "Region"("name");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "PropertyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
