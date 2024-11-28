import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Users, TrendingUp, Home, Coins, Clock, Calendar, AreaChart } from 'lucide-react';
import { Card, LineChart, Title } from "@tremor/react";
import * as RechartsType from 'recharts';
import {
  AreaChart as RechartsAreaChart,
  Area as RechartsArea,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer as RechartsResponsiveContainer
} from 'recharts';

type RentalComparison = {
  shortTerm: {
    low: string;
    mid: string;
    high: string;
    averageOccupancyRate: string;
  };
  longTerm: {
    low: string;
    mid: string;
    high: string;
    averageLeaseLength: string;
  };
};

type PricePrediction = {
  month: string;
  shortTerm: number;
  longTerm: number;
};

type RentalType = {
  type: string;
  priceRange: string;
  description: string;
};

type City = {
  name: string;
  population: string;
  averagePricePerM2: string;
  rentalComparison: RentalComparison;
  profitabilityIndex: string; // Percentage indicating relative profitability
  pricePredictions: PricePrediction[];
  rentalTypes: RentalType[];
};

const cities: City[] = [
  {
    name: 'Casablanca',
    population: '3.36M',
    averagePricePerM2: '15,000 MAD',
    rentalComparison: {
      shortTerm: {
        low: '400 MAD',
        mid: '800 MAD',
        high: '1,500 MAD',
        averageOccupancyRate: '75%'
      },
      longTerm: {
        low: '3,500 MAD',
        mid: '5,000 MAD',
        high: '8,000 MAD',
        averageLeaseLength: '24 mois'
      }
    },
    profitabilityIndex: '85%',
    pricePredictions: [
      { month: 'Jan', shortTerm: 800, longTerm: 5000 },
      { month: 'Fév', shortTerm: 850, longTerm: 5100 },
      { month: 'Mar', shortTerm: 900, longTerm: 5200 },
      { month: 'Avr', shortTerm: 950, longTerm: 5300 },
      { month: 'Mai', shortTerm: 1000, longTerm: 5400 },
      { month: 'Jun', shortTerm: 1100, longTerm: 5500 },
    ],
    rentalTypes: [
      { type: 'Studio', priceRange: '3,000 - 5,000 MAD', description: 'Idéal pour célibataires' },
      { type: 'F2', priceRange: '4,500 - 7,000 MAD', description: 'Pour couples' },
      { type: 'F3', priceRange: '6,000 - 9,000 MAD', description: 'Familial' },
    ],
  },
  {
    name: 'Marrakech',
    population: '928K',
    averagePricePerM2: '12,000 MAD',
    rentalComparison: {
      shortTerm: {
        low: '300 MAD',
        mid: '600 MAD',
        high: '1,200 MAD',
        averageOccupancyRate: '65%'
      },
      longTerm: {
        low: '2,500 MAD',
        mid: '4,000 MAD',
        high: '7,000 MAD',
        averageLeaseLength: '36 mois'
      }
    },
    profitabilityIndex: '75%',
    pricePredictions: [
      { month: 'Jan', shortTerm: 600, longTerm: 3500 },
      { month: 'Fév', shortTerm: 650, longTerm: 3600 },
      { month: 'Mar', shortTerm: 700, longTerm: 3700 },
      { month: 'Avr', shortTerm: 750, longTerm: 3800 },
      { month: 'Mai', shortTerm: 800, longTerm: 3900 },
      { month: 'Jun', shortTerm: 850, longTerm: 4000 },
    ],
    rentalTypes: [
      { type: 'Studio', priceRange: '3,000 - 5,000 MAD', description: 'Idéal pour célibataires' },
      { type: 'F2', priceRange: '4,500 - 7,000 MAD', description: 'Pour couples' },
      { type: 'F3', priceRange: '6,000 - 9,000 MAD', description: 'Familial' },
    ],
  },
  {
    name: 'Rabat',
    population: '577K',
    averagePricePerM2: '14,000 MAD',
    rentalComparison: {
      shortTerm: {
        low: '350 MAD',
        mid: '700 MAD',
        high: '1,400 MAD',
        averageOccupancyRate: '70%'
      },
      longTerm: {
        low: '3,000 MAD',
        mid: '4,500 MAD',
        high: '7,500 MAD',
        averageLeaseLength: '30 mois'
      }
    },
    profitabilityIndex: '80%',
    pricePredictions: [
      { month: 'Jan', shortTerm: 700, longTerm: 3000 },
      { month: 'Fév', shortTerm: 750, longTerm: 3100 },
      { month: 'Mar', shortTerm: 800, longTerm: 3200 },
      { month: 'Avr', shortTerm: 850, longTerm: 3300 },
      { month: 'Mai', shortTerm: 900, longTerm: 3400 },
      { month: 'Jun', shortTerm: 950, longTerm: 3500 },
    ],
    rentalTypes: [
      { type: 'Studio', priceRange: '3,000 - 5,000 MAD', description: 'Idéal pour célibataires' },
      { type: 'F2', priceRange: '4,500 - 7,000 MAD', description: 'Pour couples' },
      { type: 'F3', priceRange: '6,000 - 9,000 MAD', description: 'Familial' },
    ],
  },
  {
    name: 'Fes',
    population: '1.15M',
    averagePricePerM2: '10,000 MAD',
    rentalComparison: {
      shortTerm: {
        low: '250 MAD',
        mid: '500 MAD',
        high: '1,000 MAD',
        averageOccupancyRate: '60%'
      },
      longTerm: {
        low: '2,000 MAD',
        mid: '3,500 MAD',
        high: '6,000 MAD',
        averageLeaseLength: '48 mois'
      }
    },
    profitabilityIndex: '70%',
    pricePredictions: [
      { month: 'Jan', shortTerm: 500, longTerm: 2000 },
      { month: 'Fév', shortTerm: 550, longTerm: 2100 },
      { month: 'Mar', shortTerm: 600, longTerm: 2200 },
      { month: 'Avr', shortTerm: 650, longTerm: 2300 },
      { month: 'Mai', shortTerm: 700, longTerm: 2400 },
      { month: 'Jun', shortTerm: 750, longTerm: 2500 },
    ],
    rentalTypes: [
      { type: 'Studio', priceRange: '3,000 - 5,000 MAD', description: 'Idéal pour célibataires' },
      { type: 'F2', priceRange: '4,500 - 7,000 MAD', description: 'Pour couples' },
      { type: 'F3', priceRange: '6,000 - 9,000 MAD', description: 'Familial' },
    ],
  },
  {
    name: 'Tangier',
    population: '947K',
    averagePricePerM2: '11,000 MAD',
    rentalComparison: {
      shortTerm: {
        low: '300 MAD',
        mid: '600 MAD',
        high: '1,200 MAD',
        averageOccupancyRate: '70%'
      },
      longTerm: {
        low: '3,000 MAD',
        mid: '4,500 MAD',
        high: '7,500 MAD',
        averageLeaseLength: '36 mois'
      }
    },
    profitabilityIndex: '80%',
    pricePredictions: [
      { month: 'Jan', shortTerm: 600, longTerm: 3000 },
      { month: 'Fév', shortTerm: 650, longTerm: 3100 },
      { month: 'Mar', shortTerm: 700, longTerm: 3200 },
      { month: 'Avr', shortTerm: 750, longTerm: 3300 },
      { month: 'Mai', shortTerm: 800, longTerm: 3400 },
      { month: 'Jun', shortTerm: 850, longTerm: 3500 },
    ],
    rentalTypes: [
      { type: 'Studio', priceRange: '3,000 - 5,000 MAD', description: 'Idéal pour célibataires' },
      { type: 'F2', priceRange: '4,500 - 7,000 MAD', description: 'Pour couples' },
      { type: 'F3', priceRange: '6,000 - 9,000 MAD', description: 'Familial' },
    ],
  },
  {
    name: 'Agadir',
    population: '600K',
    averagePricePerM2: '9,000 MAD',
    rentalComparison: {
      shortTerm: {
        low: '200 MAD',
        mid: '400 MAD',
        high: '800 MAD',
        averageOccupancyRate: '50%'
      },
      longTerm: {
        low: '2,500 MAD',
        mid: '4,000 MAD',
        high: '7,000 MAD',
        averageLeaseLength: '48 mois'
      }
    },
    profitabilityIndex: '60%',
    pricePredictions: [
      { month: 'Jan', shortTerm: 400, longTerm: 2500 },
      { month: 'Fév', shortTerm: 450, longTerm: 2600 },
      { month: 'Mar', shortTerm: 500, longTerm: 2700 },
      { month: 'Avr', shortTerm: 550, longTerm: 2800 },
      { month: 'Mai', shortTerm: 600, longTerm: 2900 },
      { month: 'Jun', shortTerm: 650, longTerm: 3000 },
    ],
    rentalTypes: [
      { type: 'Studio', priceRange: '3,000 - 5,000 MAD', description: 'Idéal pour célibataires' },
      { type: 'F2', priceRange: '4,500 - 7,000 MAD', description: 'Pour couples' },
      { type: 'F3', priceRange: '6,000 - 9,000 MAD', description: 'Familial' },
    ],
  },
  // Add more cities as needed
];

const ComparisonCard = ({ title, data, icon: Icon }: {
  title: string;
  data: { low: string; mid: string; high: string; averageOccupancyRate?: string; averageLeaseLength?: string };
  icon: React.ElementType;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 
               hover:border-violet-500/30 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-violet-500/10 rounded-lg">
        <Icon className="w-5 h-5 text-violet-400" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">Bas</div>
          <div className="text-xl font-bold text-white">{data.low}</div>
        </div>
        <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-violet-500/30">
          <div className="text-sm text-gray-400 mb-2">Moyen</div>
          <div className="text-xl font-bold text-white">{data.mid}</div>
        </div>
        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <div className="text-sm text-gray-400 mb-2">Haut</div>
          <div className="text-xl font-bold text-white">{data.high}</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <span className="text-gray-400">
          {data.averageOccupancyRate ? 'Taux d\'occupation' : 'Durée moyenne'}:
        </span>
        <span className="text-white font-semibold">
          {data.averageOccupancyRate || data.averageLeaseLength}
        </span>
      </div>
    </div>
  </motion.div>
);

const XAxisWrapper = RechartsXAxis as unknown as React.FC<RechartsType.XAxisProps>;
const YAxisWrapper = RechartsYAxis as unknown as React.FC<RechartsType.YAxisProps>;
const AreaWrapper = RechartsArea as unknown as React.FC<RechartsType.AreaProps>;
const TooltipWrapper = RechartsTooltip as unknown as React.FC<RechartsType.TooltipProps<any, any>>;

const PricePredictionChart = ({ data }: { data: PricePrediction[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-violet-500/20 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-violet-500/10 rounded-lg">
        <TrendingUp className="w-5 h-5 text-violet-400" />
      </div>
      <h3 className="text-lg font-semibold text-white">Prévision des Prix</h3>
    </div>

    <div className="h-[300px] w-full">
      <RechartsResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="shortTermGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="longTermGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <RechartsCartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
          <XAxisWrapper 
            dataKey="month" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxisWrapper 
            stroke="#9CA3AF"
            fontSize={12}
            tickFormatter={(value) => `${value} MAD`}
          />
          <TooltipWrapper
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '0.5rem',
              color: '#F3F4F6',
            }}
            itemStyle={{ color: '#F3F4F6' }}
            formatter={(value: number) => [`${value} MAD`]}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <AreaWrapper
            type="monotone"
            dataKey="shortTerm"
            stroke="#8B5CF6"
            fillOpacity={1}
            fill="url(#shortTermGradient)"
            strokeWidth={2}
            name="Court Terme"
          />
          <AreaWrapper
            type="monotone"
            dataKey="longTerm"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#longTermGradient)"
            strokeWidth={2}
            name="Long Terme"
          />
        </RechartsAreaChart>
      </RechartsResponsiveContainer>
    </div>
  </motion.div>
);

const RentalTypesGrid = ({ types }: { types: RentalType[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-violet-500/10 rounded-lg">
        <Home className="w-5 h-5 text-violet-400" />
      </div>
      <h3 className="text-lg font-semibold text-white">Types de Location</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {types.map((type, index) => (
        <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
          <h4 className="text-violet-400 font-semibold mb-2">{type.type}</h4>
          <p className="text-white font-bold mb-1">{type.priceRange}</p>
          <p className="text-gray-400 text-sm">{type.description}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function MarketAnalysisPage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Comparaison des Locations</h1>
          <p className="text-gray-400">
            Analysez les différences entre location courte durée et longue durée par ville
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

          {/* Rental Comparison Details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">
                {selectedCity ? `${selectedCity.name} - Analyse Comparative` : 'Sélectionnez une ville'}
              </h2>
              
              {selectedCity && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ComparisonCard
                      title="Location Courte Durée"
                      data={selectedCity.rentalComparison.shortTerm}
                      icon={Clock}
                    />
                    <ComparisonCard
                      title="Location Longue Durée"
                      data={selectedCity.rentalComparison.longTerm}
                      icon={Calendar}
                    />
                  </div>

                  <RentalTypesGrid types={selectedCity.rentalTypes} />

                  <PricePredictionChart data={selectedCity.pricePredictions} />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Indice de Rentabilité</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
                            style={{ width: selectedCity.profitabilityIndex }}
                          />
                        </div>
                        <span className="text-white font-semibold">
                          {selectedCity.profitabilityIndex}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 