import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Users, TrendingUp, Home, Coins } from 'lucide-react';

// Define a type for the city
type City = {
  name: string;
  population: string;
  averagePricePerM2: string;
  averagePriceAppartement: string;
  averagePriceVilla: string;
  rentalTypes: {
    type: string;
    priceVariation: string;
    transactionsVariation: string;
  }[];
};

const cities: City[] = [
  {
    name: 'Casablanca',
    population: '3.36M',
    averagePricePerM2: '15,000 MAD',
    averagePriceAppartement: '12,000 MAD',
    averagePriceVilla: '20,000 MAD',
    rentalTypes: [
      { type: 'Maison', priceVariation: '5%', transactionsVariation: '10%' },
      { type: 'Appartement', priceVariation: '3%', transactionsVariation: '8%' },
      { type: 'Villa', priceVariation: '7%', transactionsVariation: '12%' },
    ],
  },
  {
    name: 'Marrakech',
    population: '928K',
    averagePricePerM2: '12,000 MAD',
    averagePriceAppartement: '10,000 MAD',
    averagePriceVilla: '18,000 MAD',
    rentalTypes: [
      { type: 'Maison', priceVariation: '4%', transactionsVariation: '9%' },
      { type: 'Appartement', priceVariation: '2%', transactionsVariation: '7%' },
      { type: 'Villa', priceVariation: '6%', transactionsVariation: '11%' },
    ],
  },
  {
    name: 'Rabat',
    population: '577K',
    averagePricePerM2: '14,000 MAD',
    averagePriceAppartement: '11,000 MAD',
    averagePriceVilla: '19,000 MAD',
    rentalTypes: [
      { type: 'Maison', priceVariation: '6%', transactionsVariation: '9%' },
      { type: 'Appartement', priceVariation: '4%', transactionsVariation: '7%' },
      { type: 'Villa', priceVariation: '8%', transactionsVariation: '13%' },
    ],
  },
  {
    name: 'Fes',
    population: '1.15M',
    averagePricePerM2: '10,000 MAD',
    averagePriceAppartement: '8,000 MAD',
    averagePriceVilla: '15,000 MAD',
    rentalTypes: [
      { type: 'Maison', priceVariation: '3%', transactionsVariation: '5%' },
      { type: 'Appartement', priceVariation: '2%', transactionsVariation: '4%' },
      { type: 'Villa', priceVariation: '5%', transactionsVariation: '8%' },
    ],
  },
  {
    name: 'Tangier',
    population: '947K',
    averagePricePerM2: '11,000 MAD',
    averagePriceAppartement: '9,000 MAD',
    averagePriceVilla: '16,000 MAD',
    rentalTypes: [
      { type: 'Maison', priceVariation: '4%', transactionsVariation: '6%' },
      { type: 'Appartement', priceVariation: '3%', transactionsVariation: '5%' },
      { type: 'Villa', priceVariation: '7%', transactionsVariation: '10%' },
    ],
  },
  {
    name: 'Agadir',
    population: '600K',
    averagePricePerM2: '9,000 MAD',
    averagePriceAppartement: '7,000 MAD',
    averagePriceVilla: '14,000 MAD',
    rentalTypes: [
      { type: 'Maison', priceVariation: '2%', transactionsVariation: '3%' },
      { type: 'Appartement', priceVariation: '1%', transactionsVariation: '2%' },
      { type: 'Villa', priceVariation: '4%', transactionsVariation: '6%' },
    ],
  },
  // Add more cities as needed
];

export default function MarketAnalysisPage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const getColorClass = (value: string) => {
    const numericValue = parseFloat(value);
    return numericValue > 0 ? 'text-green-500' : 'text-red-500';
  };

  const StatCard = ({ icon: Icon, title, value, subvalue, trend = null }: {
    icon: any;
    title: string;
    value: string | number;
    subvalue: string;
    trend?: number | null;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 
                 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg 
                 hover:shadow-violet-500/10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-violet-500/10 rounded-lg">
          <Icon className="w-5 h-5 text-violet-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-white">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          <div className="text-sm text-gray-400">{subvalue}</div>
        </div>
        {trend && (
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-emerald-500">+{trend}%</span>
            <span className="text-gray-400 text-sm">croissance annuelle</span>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analyse de Marché</h1>
          <p className="text-gray-400">
            Explorez les tendances du marché immobilier dans les principales villes du Maroc.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* City List Section */}
          <div className="lg:col-span-1 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Liste des Villes</h2>
            <div className="grid grid-cols-1 gap-4">
              {cities.map((city, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="text-lg font-semibold text-blue-500">
                    {city.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* City Details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                {selectedCity ? selectedCity.name : 'Sélectionnez une ville'}
              </h2>
              {selectedCity && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StatCard
                    icon={Users}
                    title="Population"
                    value={selectedCity.population}
                    subvalue="habitants"
                  />
                  <StatCard
                    icon={Coins}
                    title="Prix Moyen au m²"
                    value={selectedCity.averagePricePerM2}
                    subvalue="MAD"
                  />
                  <StatCard
                    icon={Coins}
                    title="Prix Moyen Appartement"
                    value={selectedCity.averagePriceAppartement}
                    subvalue="MAD"
                  />
                  <StatCard
                    icon={Coins}
                    title="Prix Moyen Villa"
                    value={selectedCity.averagePriceVilla}
                    subvalue="MAD"
                  />
                  {selectedCity.rentalTypes.map((rental, idx) => (
                    <StatCard
                      key={idx}
                      icon={Home}
                      title={rental.type}
                      value={rental.priceVariation}
                      subvalue="Variation du Prix"
                      trend={parseFloat(rental.transactionsVariation)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 