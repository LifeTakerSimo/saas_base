import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';

type ProjectInputModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { price: string; city: string; surface: string }) => void;
};

export default function ProjectInputModal({ isOpen, onClose, onSubmit }: ProjectInputModalProps) {
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [surface, setSurface] = useState('');

  const handleSubmit = () => {
    onSubmit({ price, city, surface });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl max-w-md w-full p-8"
      >
        <Dialog.Title className="text-2xl font-semibold text-white mb-4">Nouveau Projet</Dialog.Title>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-700 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
          />
          <input
            type="text"
            placeholder="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-gray-700 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
          />
          <input
            type="text"
            placeholder="Surface"
            value={surface}
            onChange={(e) => setSurface(e.target.value)}
            className="w-full border border-gray-700 rounded-lg p-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">Annuler</button>
          <button onClick={handleSubmit} className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:from-purple-700 hover:to-blue-600 transition-colors">Valider</button>
        </div>
      </motion.div>
    </Dialog>
  );
} 