import React from 'react';
import { motion } from 'framer-motion';

type TooltipProps = {
  region: string;
  data: {
    population: number;
    medianAge: number;
    averageIncome: number;
  } | undefined;
};

export function Tooltip({ region, data }: TooltipProps) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute z-10 bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-lg"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <h3 className="text-white font-semibold mb-2">{region}</h3>
      <div className="space-y-1 text-sm">
        <p className="text-gray-400">
          Population: {data.population.toLocaleString()}
        </p>
        <p className="text-gray-400">
          Âge médian: {data.medianAge} ans
        </p>
        <p className="text-gray-400">
          Revenu moyen: {data.averageIncome.toLocaleString()} MAD
        </p>
      </div>
    </motion.div>
  );
} 