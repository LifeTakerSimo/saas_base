import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Users, TrendingUp, Home, Coins } from 'lucide-react';
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
};

// Define a type for the market trend
type MarketTrend = {
  month: string;
  sales: number;
  listings: number;
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
                <>
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
                  
                  {/* Add Charts */}
                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <MarketTrendChart data={selectedCity.marketTrends} priceHistory={selectedCity.priceHistory} />
                    <InvestmentMetrics data={selectedCity} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 