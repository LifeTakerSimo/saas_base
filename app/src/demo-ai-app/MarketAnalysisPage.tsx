import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Users, TrendingUp, Home, Coins, ChartBar, Search, MapPin, ChevronRight, X } from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell as RechartCell,
  Legend as RechartsLegend,
  ResponsiveContainer as RechartsResponsiveContainer,
  CartesianGrid as RechartsCartesianGrid,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltip,
  XAxisProps,
  YAxisProps,
  TooltipProps,
  CartesianGridProps,
  LineProps,
  PieProps,
  LegendProps,
} from 'recharts';

const COLORS = ['#8B5CF6', '#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

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
  marketTrends: MarketTrend[];
  propertyDistribution: {
    type: string;
    percentage: number;
  }[];
  investmentScore: number;
  priceHistory: {
    year: string;
    price: number;
  }[];
  quartiers: Quartier[];
  yearlyStats: {
    transactionVariation: number;
    priceVariation: number;
  };
};

// Define a type for the market trend
type MarketTrend = {
  month: string;
  sales: number;
  listings: number;
};

// Add this type definition at the top with other types
type Quartier = {
  name: string;
  averagePricePerM2: string;
  priceEvolution: number;
  propertyCount: number;
  investmentScore: number;
  demographics: {
    population: string;
    medianAge: number;
    incomeLevel: string;
  };
  amenities: {
    schools: number;
    parks: number;
    shops: number;
    transport: number;
  };
  marketMetrics: {
    demandLevel: 'High' | 'Medium' | 'Low';
    averageDaysOnMarket: number;
    priceRange: {
      min: string;
      max: string;
    };
  };
  propertyTypes: {
    type: string;
    percentage: number;
    averagePrice: string;
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
    marketTrends: [
      { month: 'Jan', sales: 120, listings: 200 },
      { month: 'Feb', sales: 150, listings: 220 },
      // ... add more months
    ],
    propertyDistribution: [
      { type: 'Appartements', percentage: 65 },
      { type: 'Villas', percentage: 20 },
      { type: 'Maisons', percentage: 15 },
    ],
    investmentScore: 8.5,
    priceHistory: [
      { year: '2019', price: 13000 },
      { year: '2020', price: 13500 },
      { year: '2021', price: 14200 },
      { year: '2022', price: 14800 },
      { year: '2023', price: 15000 },
    ],
    quartiers: [
      {
        name: 'Guéliz',
        averagePricePerM2: '14,500 MAD',
        priceEvolution: 8.5,
        propertyCount: 245,
        investmentScore: 8.2,
        demographics: {
          population: '45K',
          medianAge: 35,
          incomeLevel: 'Élevé'
        },
        amenities: {
          schools: 12,
          parks: 4,
          shops: 156,
          transport: 8
        },
        marketMetrics: {
          demandLevel: 'High',
          averageDaysOnMarket: 45,
          priceRange: {
            min: '8,000 MAD',
            max: '20,000 MAD'
          }
        },
        propertyTypes: [
          { type: 'Appartements', percentage: 65, averagePrice: '1.2M MAD' },
          { type: 'Villas', percentage: 20, averagePrice: '3.5M MAD' },
          { type: 'Riads', percentage: 15, averagePrice: '2.8M MAD' }
        ]
      },
      {
        name: 'Hivernage',
        averagePricePerM2: '16,800 MAD',
        priceEvolution: 9.2,
        propertyCount: 180,
        investmentScore: 8.5,
        demographics: {
          population: '38K',
          medianAge: 40,
          incomeLevel: 'Élevé'
        },
        amenities: {
          schools: 8,
          parks: 6,
          shops: 120,
          transport: 10
        },
        marketMetrics: {
          demandLevel: 'High',
          averageDaysOnMarket: 38,
          priceRange: {
            min: '10,000 MAD',
            max: '25,000 MAD'
          }
        },
        propertyTypes: [
          { type: 'Appartements', percentage: 55, averagePrice: '1.5M MAD' },
          { type: 'Villas', percentage: 30, averagePrice: '4.2M MAD' },
          { type: 'Riads', percentage: 15, averagePrice: '3.5M MAD' }
        ]
      },
      {
        name: 'Médina',
        averagePricePerM2: '12,200 MAD',
        priceEvolution: 6.8,
        propertyCount: 320,
        investmentScore: 7.8,
        demographics: {
          population: '52K',
          medianAge: 32,
          incomeLevel: 'Moyen'
        },
        amenities: {
          schools: 15,
          parks: 3,
          shops: 200,
          transport: 12
        },
        marketMetrics: {
          demandLevel: 'Medium',
          averageDaysOnMarket: 52,
          priceRange: {
            min: '6,000 MAD',
            max: '18,000 MAD'
          }
        },
        propertyTypes: [
          { type: 'Appartements', percentage: 70, averagePrice: '950K MAD' },
          { type: 'Riads', percentage: 25, averagePrice: '2.2M MAD' },
          { type: 'Maisons', percentage: 5, averagePrice: '1.8M MAD' }
        ]
      }
    ],
    yearlyStats: {
      transactionVariation: 12.5,
      priceVariation: 8.2
    }
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
    marketTrends: [
      { month: 'Jan', sales: 80, listings: 150 },
      { month: 'Feb', sales: 100, listings: 180 },
      // ... add more months
    ],
    propertyDistribution: [
      { type: 'Appartements', percentage: 70 },
      { type: 'Villas', percentage: 15 },
      { type: 'Maisons', percentage: 15 },
    ],
    investmentScore: 7.5,
    priceHistory: [
      { year: '2019', price: 11000 },
      { year: '2020', price: 11500 },
      { year: '2021', price: 12200 },
      { year: '2022', price: 12800 },
      { year: '2023', price: 13000 },
    ],
    quartiers: [
      {
        name: 'Guéliz',
        averagePricePerM2: '14,500 MAD',
        priceEvolution: 8.5,
        propertyCount: 245,
        investmentScore: 8.2,
        demographics: {
          population: '45K',
          medianAge: 35,
          incomeLevel: 'Élevé'
        },
        amenities: {
          schools: 12,
          parks: 4,
          shops: 156,
          transport: 8
        },
        marketMetrics: {
          demandLevel: 'High',
          averageDaysOnMarket: 45,
          priceRange: {
            min: '8,000 MAD',
            max: '20,000 MAD'
          }
        },
        propertyTypes: [
          { type: 'Appartements', percentage: 65, averagePrice: '1.2M MAD' },
          { type: 'Villas', percentage: 20, averagePrice: '3.5M MAD' },
          { type: 'Riads', percentage: 15, averagePrice: '2.8M MAD' }
        ]
      },
      // Add more quartiers...
    ],
    yearlyStats: {
      transactionVariation: 15.3,
      priceVariation: 7.8
    }
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
    marketTrends: [
      { month: 'Jan', sales: 90, listings: 160 },
      { month: 'Feb', sales: 110, listings: 190 },
      // ... add more months
    ],
    propertyDistribution: [
      { type: 'Appartements', percentage: 60 },
      { type: 'Villas', percentage: 25 },
      { type: 'Maisons', percentage: 15 },
    ],
    investmentScore: 8.0,
    priceHistory: [
      { year: '2019', price: 12000 },
      { year: '2020', price: 12500 },
      { year: '2021', price: 13200 },
      { year: '2022', price: 13800 },
      { year: '2023', price: 14000 },
    ],
    quartiers: [
      {
        name: 'Guéliz',
        averagePricePerM2: '14,500 MAD',
        priceEvolution: 8.5,
        propertyCount: 245,
        investmentScore: 8.2,
        demographics: {
          population: '45K',
          medianAge: 35,
          incomeLevel: 'Élevé'
        },
        amenities: {
          schools: 12,
          parks: 4,
          shops: 156,
          transport: 8
        },
        marketMetrics: {
          demandLevel: 'High',
          averageDaysOnMarket: 45,
          priceRange: {
            min: '8,000 MAD',
            max: '20,000 MAD'
          }
        },
        propertyTypes: [
          { type: 'Appartements', percentage: 65, averagePrice: '1.2M MAD' },
          { type: 'Villas', percentage: 20, averagePrice: '3.5M MAD' },
          { type: 'Riads', percentage: 15, averagePrice: '2.8M MAD' }
        ]
      },
      // Add more quartiers...
    ],
    yearlyStats: {
      transactionVariation: 9.8,
      priceVariation: 6.5
    }
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
    marketTrends: [
      { month: 'Jan', sales: 100, listings: 180 },
      { month: 'Feb', sales: 120, listings: 200 },
      // ... add more months
    ],
    propertyDistribution: [
      { type: 'Appartements', percentage: 75 },
      { type: 'Villas', percentage: 10 },
      { type: 'Maisons', percentage: 15 },
    ],
    investmentScore: 7.0,
    priceHistory: [
      { year: '2019', price: 9000 },
      { year: '2020', price: 9500 },
      { year: '2021', price: 10200 },
      { year: '2022', price: 10800 },
      { year: '2023', price: 11000 },
    ],
    quartiers: [
      {
        name: 'Guéliz',
        averagePricePerM2: '14,500 MAD',
        priceEvolution: 8.5,
        propertyCount: 245,
        investmentScore: 8.2,
        demographics: {
          population: '45K',
          medianAge: 35,
          incomeLevel: 'Élevé'
        },
        amenities: {
          schools: 12,
          parks: 4,
          shops: 156,
          transport: 8
        },
        marketMetrics: {
          demandLevel: 'High',
          averageDaysOnMarket: 45,
          priceRange: {
            min: '8,000 MAD',
            max: '20,000 MAD'
          }
        },
        propertyTypes: [
          { type: 'Appartements', percentage: 65, averagePrice: '1.2M MAD' },
          { type: 'Villas', percentage: 20, averagePrice: '3.5M MAD' },
          { type: 'Riads', percentage: 15, averagePrice: '2.8M MAD' }
        ]
      },
      // Add more quartiers...
    ],
    yearlyStats: {
      transactionVariation: 7.2,
      priceVariation: 5.4
    }
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
    marketTrends: [
      { month: 'Jan', sales: 110, listings: 190 },
      { month: 'Feb', sales: 130, listings: 210 },
      // ... add more months
    ],
    propertyDistribution: [
      { type: 'Appartements', percentage: 65 },
      { type: 'Villas', percentage: 20 },
      { type: 'Maisons', percentage: 15 },
    ],
    investmentScore: 7.5,
    priceHistory: [
      { year: '2019', price: 10000 },
      { year: '2020', price: 10500 },
      { year: '2021', price: 11200 },
      { year: '2022', price: 11800 },
      { year: '2023', price: 12000 },
    ],
    quartiers: [
      {
        name: 'Guéliz',
        averagePricePerM2: '14,500 MAD',
        priceEvolution: 8.5,
        propertyCount: 245,
        investmentScore: 8.2,
        demographics: {
          population: '45K',
          medianAge: 35,
          incomeLevel: 'Élevé'
        },
        amenities: {
          schools: 12,
          parks: 4,
          shops: 156,
          transport: 8
        },
        marketMetrics: {
          demandLevel: 'High',
          averageDaysOnMarket: 45,
          priceRange: {
            min: '8,000 MAD',
            max: '20,000 MAD'
          }
        },
        propertyTypes: [
          { type: 'Appartements', percentage: 65, averagePrice: '1.2M MAD' },
          { type: 'Villas', percentage: 20, averagePrice: '3.5M MAD' },
          { type: 'Riads', percentage: 15, averagePrice: '2.8M MAD' }
        ]
      },
      // Add more quartiers...
    ],
    yearlyStats: {
      transactionVariation: 11.3,
      priceVariation: 7.1
    }
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
    marketTrends: [
      { month: 'Jan', sales: 70, listings: 140 },
      { month: 'Feb', sales: 90, listings: 160 },
      // ... add more months
    ],
    propertyDistribution: [
      { type: 'Appartements', percentage: 70 },
      { type: 'Villas', percentage: 20 },
      { type: 'Maisons', percentage: 10 },
    ],
    investmentScore: 6.5,
    priceHistory: [
      { year: '2019', price: 8000 },
      { year: '2020', price: 8500 },
      { year: '2021', price: 9200 },
      { year: '2022', price: 9800 },
      { year: '2023', price: 10000 },
    ],
    quartiers: [
      {
        name: 'Guéliz',
        averagePricePerM2: '14,500 MAD',
        priceEvolution: 8.5,
        propertyCount: 245,
        investmentScore: 8.2,
        demographics: {
          population: '45K',
          medianAge: 35,
          incomeLevel: 'Élevé'
        },
        amenities: {
          schools: 12,
          parks: 4,
          shops: 156,
          transport: 8
        },
        marketMetrics: {
          demandLevel: 'High',
          averageDaysOnMarket: 45,
          priceRange: {
            min: '8,000 MAD',
            max: '20,000 MAD'
          }
        },
        propertyTypes: [
          { type: 'Appartements', percentage: 65, averagePrice: '1.2M MAD' },
          { type: 'Villas', percentage: 20, averagePrice: '3.5M MAD' },
          { type: 'Riads', percentage: 15, averagePrice: '2.8M MAD' }
        ]
      },
    ],
    yearlyStats: {
      transactionVariation: 6.8,
      priceVariation: 4.9
    }
  },
];

// Update wrapper declarations
const XAxisWrapper = RechartsXAxis as unknown as React.FC<XAxisProps>;
const YAxisWrapper = RechartsYAxis as unknown as React.FC<YAxisProps>;
const TooltipWrapper = RechartsTooltip as unknown as React.FC<TooltipProps<any, any>>;
const CartesianGridWrapper = RechartsCartesianGrid as unknown as React.FC<CartesianGridProps>;
const LineWrapper = RechartsLine as unknown as React.FC<LineProps>;
const PieWrapper = RechartsPie as unknown as React.FC<PieProps>;
const LegendWrapper = RechartsLegend as unknown as React.FC<LegendProps>;

// Add this new component
const QuartierAnalysis = ({ quartier }: { quartier: Quartier }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
  >
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-white">{quartier.name}</h3>
      <div className="flex items-center gap-2 bg-violet-500/10 px-3 py-1 rounded-full">
        <ChartBar className="w-4 h-4 text-violet-400" />
        <span className="text-violet-400 font-medium">Score: {quartier.investmentScore}/10</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <div className="text-sm text-gray-400">Prix Moyen/m²</div>
        <div className="text-2xl font-bold text-white">{quartier.averagePricePerM2}</div>
        <div className="flex items-center gap-1 mt-1">
          <TrendingUp className="w-4 h-4 text-emerald-500" />
          <span className="text-emerald-500">+{quartier.priceEvolution}%</span>
        </div>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg">
        <div className="text-sm text-gray-400">Biens Disponibles</div>
        <div className="text-2xl font-bold text-white">{quartier.propertyCount}</div>
        <div className="text-sm text-gray-400 mt-1">Actuellement en vente</div>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg">
        <div className="text-sm text-gray-400">Délai de Vente Moyen</div>
        <div className="text-2xl font-bold text-white">{quartier.marketMetrics.averageDaysOnMarket} jours</div>
        <div className="text-sm text-gray-400 mt-1">Demande {quartier.marketMetrics.demandLevel}</div>
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg">
        <div className="text-sm text-gray-400">Population</div>
        <div className="text-2xl font-bold text-white">{quartier.demographics.population}</div>
        <div className="text-sm text-gray-400 mt-1">Âge médian: {quartier.demographics.medianAge} ans</div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Amenities Chart */}
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-4">Commodités</h4>
        <div className="space-y-3">
          {Object.entries(quartier.amenities).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-400 capitalize">{key}</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-2 bg-violet-500 rounded-full"
                    style={{ width: `${(value / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-white font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Property Types Distribution */}
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-white mb-4">Types de Biens</h4>
        <div className="space-y-3">
          {quartier.propertyTypes.map((type) => (
            <div key={type.type} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{type.type}</span>
                <span className="text-white font-medium">{type.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-violet-500 rounded-full"
                  style={{ width: `${type.percentage}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-400">Prix moyen: {type.averagePrice}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);
// Add this new component for the quartier selector
const QuartierSelector = ({ 
  quartiers, 
  selectedQuartier, 
  onQuartierSelect 
}: { 
  quartiers: Quartier[];
  selectedQuartier: Quartier | null;
  onQuartierSelect: (quartier: Quartier) => void;
}) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-white">Sélectionner un Quartier</h3>
      <div className="text-sm text-gray-400">
        {quartiers.length} quartiers disponibles
      </div>
    </div>
    
    {/* Search and Filter Bar */}
    <div className="flex gap-4 mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Rechercher un quartier..."
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white 
                     placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
        />
        <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      
      <select 
        className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-white 
                   focus:outline-none focus:border-violet-500 transition-colors"
      >
        <option value="">Prix (tous)</option>
        <option value="low">Prix bas à élevé</option>
        <option value="high">Prix élevé à bas</option>
      </select>
    </div>

    {/* Quartier Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quartiers.map((quartier) => (
        <motion.div
          key={quartier.name}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onQuartierSelect(quartier)}
          className={`
            cursor-pointer rounded-xl p-4 transition-all duration-200
            ${selectedQuartier?.name === quartier.name 
              ? 'bg-violet-500/20 border-2 border-violet-500' 
              : 'bg-gray-800/50 border border-gray-700 hover:border-violet-500/50'
            }
          `}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="text-lg font-semibold text-white">{quartier.name}</h4>
              <p className="text-sm text-gray-400">{quartier.demographics.population} habitants</p>
            </div>
            <div className="bg-violet-500/10 px-2 py-1 rounded-full">
              <span className="text-violet-400 text-sm font-medium">{quartier.investmentScore}/10</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-900/50 rounded-lg p-2">
              <div className="text-gray-400">Prix/m²</div>
              <div className="text-white font-medium">{quartier.averagePricePerM2}</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-2">
              <div className="text-gray-400">Évolution</div>
              <div className="text-emerald-400 font-medium">+{quartier.priceEvolution}%</div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
            <Home className="w-4 h-4" />
            <span>{quartier.propertyCount} biens disponibles</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default function MarketAnalysisPage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedQuartier, setSelectedQuartier] = useState<Quartier | null>(null);
  const [activeTab, setActiveTab] = useState<'market' | 'quartiers'>('market');

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

  const MarketTrendChart = ({ data, priceHistory }: { data: MarketTrend[], priceHistory: { year: string; price: number }[] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-violet-500/30 transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-white">Évolution du Marché</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500"></div>
            <span className="text-sm text-gray-400">Prix au m²</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-gray-400">Volume des Ventes</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Croissance Annuelle</div>
          <div className="text-2xl font-bold text-emerald-500">+12.4%</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="text-sm text-gray-400">ROI Moyen</div>
          <div className="text-2xl font-bold text-violet-500">8.7%</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Prédiction 2024</div>
          <div className="text-2xl font-bold text-blue-500">+15.2%</div>
        </div>
      </div>

      <div className="h-[400px]">
        <RechartsResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={priceHistory} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGridWrapper strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
            <XAxisWrapper 
              dataKey="year" 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxisWrapper 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              domain={['dataMin - 1000', 'dataMax + 1000']}
              tickFormatter={(value) => `${value.toLocaleString()} MAD`}
            />
            <TooltipWrapper 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                border: '1px solid #374151',
                borderRadius: '6px',
                padding: '12px'
              }}
              formatter={(value: number) => [`${value.toLocaleString()} MAD`, 'Prix au m²']}
            />
            <LineWrapper
              type="monotone"
              dataKey="price"
              stroke="#8B5CF6"
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: '#8B5CF6' }}
            />
          </RechartsLineChart>
        </RechartsResponsiveContainer>
      </div>
    </motion.div>
  );

  const InvestmentMetrics = ({ data }: { data: City }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-violet-500/30 transition-all duration-300"
    >
      <h3 className="text-lg font-semibold text-white mb-6">Métriques d'Investissement</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Score d'Investissement</div>
            <div className="text-3xl font-bold text-violet-500">{data.investmentScore}/10</div>
            <div className="mt-2 text-sm text-gray-400">Basé sur 12 indicateurs clés</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="text-sm text-gray-400">Rendement Locatif Moyen</div>
            <div className="text-3xl font-bold text-emerald-500">6.8%</div>
            <div className="mt-2 text-sm text-gray-400">Net annuel</div>
          </div>
        </div>
        <div className="h-[300px]">
          <RechartsResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <PieWrapper
                data={data.propertyDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="percentage"
              >
                {data.propertyDistribution.map((entry, index) => (
                  <RechartCell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </PieWrapper>
              <LegendWrapper />
            </RechartsPieChart>
          </RechartsResponsiveContainer>
        </div>
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

        {/* Tabs */}
        {selectedCity && (
          <div className="flex space-x-4 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('market')}
              className={`px-4 py-2 font-medium transition-colors duration-200 ${
                activeTab === 'market'
                  ? 'text-violet-500 border-b-2 border-violet-500'
                  : 'text-gray-400 hover:text-violet-400'
              }`}
            >
              Analyse du Marché
            </button>
            <button
              onClick={() => setActiveTab('quartiers')}
              className={`px-4 py-2 font-medium transition-colors duration-200 ${
                activeTab === 'quartiers'
                  ? 'text-violet-500 border-b-2 border-violet-500'
                  : 'text-gray-400 hover:text-violet-400'
              }`}
            >
              Analyse par Quartier
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* City List Section */}
          <div className="lg:col-span-1 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Villes</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher une ville..."
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white 
                           placeholder-gray-400 focus:outline-none focus:border-violet-500 transition-colors"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {cities.map((city, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative overflow-hidden group cursor-pointer rounded-xl p-4 transition-all duration-200
                    ${selectedCity?.name === city.name 
                      ? 'bg-violet-500/20 border-2 border-violet-500' 
                      : 'bg-gray-800/50 border border-gray-700 hover:border-violet-500/50'
                    }
                  `}
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 
                                   transition-colors">
                        {city.name}
                      </h3>
                      <p className="text-sm text-gray-400">{city.population} habitants</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-violet-500/10 px-2 py-1 rounded-full">
                        <span className="text-violet-400 text-sm font-medium">
                          {city.investmentScore}/10
                        </span>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200
                        ${selectedCity?.name === city.name ? 'rotate-90' : 'group-hover:translate-x-1'}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <div className="text-xs text-gray-400">Prix/m²</div>
                      <div className="text-sm font-medium text-white">{city.averagePricePerM2}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-2">
                      <div className="text-xs text-gray-400">Quartiers</div>
                      <div className="text-sm font-medium text-white">{city.quartiers.length}</div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-violet-500/10 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {selectedCity && activeTab === 'market' && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {selectedCity ? selectedCity.name : 'Sélectionnez une ville'}
                </h2>
                {selectedCity && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        trend={selectedCity.yearlyStats.priceVariation}
                      />
                      <StatCard
                        icon={TrendingUp}
                        title="Volume des Transactions"
                        value={`+${selectedCity.yearlyStats.transactionVariation}%`}
                        subvalue="Variation annuelle"
                        trend={selectedCity.yearlyStats.transactionVariation}
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
                    
                    {/* Add Charts */}
                    <div className="grid grid-cols-1 gap-6 mt-6">
                      <MarketTrendChart data={selectedCity.marketTrends} priceHistory={selectedCity.priceHistory} />
                      <InvestmentMetrics data={selectedCity} />
                    </div>
                  </>
                )}
              </div>
            )}

            {selectedCity && activeTab === 'quartiers' && (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Quartiers de {selectedCity.name}
                  </h2>
                  <p className="text-gray-400">
                    {selectedCity.quartiers.length} quartiers disponibles
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCity.quartiers.map((quartier) => (
                    <motion.div
                      key={quartier.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedQuartier(quartier)}
                      className={`
                        cursor-pointer rounded-xl p-4 transition-all duration-200
                        ${selectedQuartier?.name === quartier.name 
                          ? 'bg-violet-500/20 border-2 border-violet-500' 
                          : 'bg-gray-800/50 border border-gray-700 hover:border-violet-500/50'
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{quartier.name}</h4>
                          <p className="text-sm text-gray-400">{quartier.demographics.population} habitants</p>
                        </div>
                        <div className="bg-violet-500/10 px-2 py-1 rounded-full">
                          <span className="text-violet-400 text-sm font-medium">{quartier.investmentScore}/10</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-gray-900/50 rounded-lg p-2">
                          <div className="text-gray-400">Prix/m²</div>
                          <div className="text-white font-medium">{quartier.averagePricePerM2}</div>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-2">
                          <div className="text-gray-400">Évolution</div>
                          <div className="text-emerald-400 font-medium">+{quartier.priceEvolution}%</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedQuartier && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8"
                  >
                    <QuartierAnalysis quartier={selectedQuartier} />
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 