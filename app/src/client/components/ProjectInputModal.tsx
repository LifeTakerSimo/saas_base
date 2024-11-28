import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';

interface ProjectData {
  price: string;
  city: string;
  surface: string;
  propertyType: string;
  condition: string;
}

type ProjectInputModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectData) => void;
};

const CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Fès", "Meknès", "Tétouan"
];

export default function ProjectInputModal({ isOpen, onClose, onSubmit }: ProjectInputModalProps) {
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [surface, setSurface] = useState('');
  const [errors, setErrors] = useState({ price: '', city: '', surface: '' });

  const validateForm = () => {
    const newErrors = {
      price: !price ? 'Prix requis' : '',
      city: !city ? 'Ville requise' : '',
      surface: !surface ? 'Surface requise' : ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        price,
        city,
        surface,
        propertyType: 'Appartement',
        condition: 'Bon état'
      });
      setPrice('');
      setCity('');
      setSurface('');
      setErrors({ price: '', city: '', surface: '' });
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 
                   rounded-xl shadow-2xl max-w-md w-full p-8 
                   border border-gray-700"
      >
        <Dialog.Title className="text-2xl font-semibold text-white mb-6">
          Nouveau Projet
        </Dialog.Title>
        <div className="space-y-4">
          <div>
            <input
              type="number"
              placeholder="Prix (MAD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-700'} 
                         rounded-lg p-3 bg-gray-700/50 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full border ${errors.city ? 'border-red-500' : 'border-gray-700'} 
                         rounded-lg p-3 bg-gray-700/50 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            >
              <option value="">Sélectionnez une ville</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <input
              type="number"
              placeholder="Surface (m²)"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              className={`w-full border ${errors.surface ? 'border-red-500' : 'border-gray-700'} 
                         rounded-lg p-3 bg-gray-700/50 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            />
            {errors.surface && <p className="text-red-500 text-sm mt-1">{errors.surface}</p>}
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-5 py-2 bg-gray-700 text-white rounded-lg 
                     hover:bg-gray-600 transition-colors"
          >
            Annuler
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 
                     text-white rounded-lg hover:from-purple-700 hover:to-blue-600 
                     transition-colors shadow-lg hover:shadow-purple-500/25"
          >
            Valider
          </motion.button>
        </div>
      </motion.div>
    </Dialog>
  );
} 