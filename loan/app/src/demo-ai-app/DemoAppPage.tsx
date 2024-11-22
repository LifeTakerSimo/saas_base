import { useState } from 'react';

type Property = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  price: number;
  surface: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  location: string;
  imageUrl: string;
  images: string[];
  features: string[];
  status: string;
}

// Mock data
const mockProperties: Property[] = [
  {
    id: '1',
    createdAt: new Date().toISOString().split('T')[0],
    title: 'Belle Villa Moderne',
    description: 'Magnifique villa avec vue sur mer, prestations haut de gamme, piscine à débordement et jardin paysager',
    price: 450000,
    surface: 200,
    type: 'villa',
    bedrooms: 4,
    bathrooms: 3,
    location: 'Nice',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=500',
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=500',
    ],
    features: ['Piscine', 'Jardin', 'Vue mer', 'Garage'],
    status: 'À vendre'
  },
  {
    id: '2',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    title: 'Appartement Haussmannien',
    description: 'Superbe appartement avec moulures et parquet d\'époque, proche des Champs-Élysées',
    price: 880000,
    surface: 85,
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    location: 'Paris 8ème',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500',
    ],
    features: ['Parking', 'Balcon', 'Ascenseur', 'Cave'],
    status: 'À vendre'
  },
  {
    id: '3',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    title: 'Loft Industriel',
    description: 'Ancien atelier rénové avec goût, grandes hauteurs sous plafond et matériaux nobles',
    price: 595000,
    surface: 120,
    type: 'loft',
    bedrooms: 2,
    bathrooms: 2,
    location: 'Lyon',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500',
    ],
    features: ['Style industriel', 'Terrasse', 'Climatisation'],
    status: 'À vendre'
  },
  {
    id: '4',
    createdAt: '2024-03-17',
    title: 'Maison Contemporaine',
    description: 'Maison d\'architecte aux lignes épurées avec domotique intégrée et performances énergétiques',
    price: 720000,
    surface: 160,
    type: 'house',
    bedrooms: 4,
    bathrooms: 2,
    location: 'Bordeaux',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500',
    ],
    features: ['Domotique', 'Jardin', 'Garage double'],
    status: 'À vendre'
  },
  {
    id: '5',
    createdAt: '2024-03-16',
    title: 'Duplex avec Rooftop',
    description: 'Magnifique duplex avec terrasse sur le toit offrant une vue panoramique sur la ville',
    price: 495000,
    surface: 95,
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    location: 'Marseille',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500',
    ],
    features: ['Terrasse', 'Vue panoramique', 'Climatisation'],
    status: 'À vendre'
  },
  {
    id: '6',
    createdAt: '2024-03-15',
    title: 'Maison de Ville',
    description: 'Charmante maison de ville avec cour intérieure et dépendance aménageable',
    price: 385000,
    surface: 140,
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    location: 'Nantes',
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=500',
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=500',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=500',
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=500',
    ],
    features: ['Cour intérieure', 'Cave à vin', 'Dépendance'],
    status: 'À vendre'
  },
  {
    id: '7',
    createdAt: '2024-03-14',
    title: 'Studio Premium',
    description: 'Studio haut de gamme entièrement meublé et équipé, idéal investissement locatif',
    price: 245000,
    surface: 35,
    type: 'studio',
    bedrooms: 1,
    bathrooms: 1,
    location: 'Paris 16ème',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=500',
    ],
    features: ['Meublé', 'Équipé', 'Gardien'],
    status: 'À vendre'
  },
  {
    id: '8',
    createdAt: '2024-03-13',
    title: 'Villa Provençale',
    description: 'Authentique villa provençale avec oliviers centenaires et piscine traditionnelle',
    price: 890000,
    surface: 250,
    type: 'villa',
    bedrooms: 5,
    bathrooms: 3,
    location: 'Aix-en-Provence',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500',
    ],
    features: ['Piscine', 'Oliveraie', 'Pool house'],
    status: 'À vendre'
  },
  {
    id: '9',
    createdAt: '2024-03-12',
    title: 'Penthouse Design',
    description: 'Penthouse d\'exception avec terrasses et jacuzzi, vue imprenable sur la ville',
    price: 1250000,
    surface: 180,
    type: 'penthouse',
    bedrooms: 4,
    bathrooms: 3,
    location: 'Lyon',
    imageUrl: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=500',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=500',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=500',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=500',
    ],
    features: ['Jacuzzi', 'Domotique', 'Cave à vin'],
    status: 'À vendre'
  }
];

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minSurface: '',
    maxSurface: '',
    type: 'all',
  });

  // Filter properties based on search and filters
  const filteredProperties = mockProperties.filter((property: Property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filters.type === 'all' || property.type === filters.type;
    const matchesMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice);
    const matchesMinSurface = !filters.minSurface || property.surface >= Number(filters.minSurface);
    const matchesMaxSurface = !filters.maxSurface || property.surface <= Number(filters.maxSurface);

    return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice && 
           matchesMinSurface && matchesMaxSurface;
  });

  if (filteredProperties.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Aucun bien immobilier trouvé</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-boxdark">
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters Section */}
        <div className="bg-white dark:bg-boxdark-2 rounded-lg shadow-lg p-6 mb-8">
          <div className="space-y-4">
            {/* Search Input */}
            <div>
              <input
                type="text"
                placeholder="Rechercher par titre, description ou localisation..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-strokedark dark:bg-boxdark focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-strokedark dark:bg-boxdark focus:ring-2 focus:ring-primary"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">Tous les types</option>
                <option value="apartment">Appartement</option>
                <option value="house">Maison</option>
                <option value="villa">Villa</option>
              </select>

              <input
                type="number"
                placeholder="Prix min"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-strokedark dark:bg-boxdark focus:ring-2 focus:ring-primary"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />

              <input
                type="number"
                placeholder="Prix max"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-strokedark dark:bg-boxdark focus:ring-2 focus:ring-primary"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />

              <input
                type="number"
                placeholder="Surface min"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-strokedark dark:bg-boxdark focus:ring-2 focus:ring-primary"
                value={filters.minSurface}
                onChange={(e) => setFilters({ ...filters, minSurface: e.target.value })}
              />

              <input
                type="number"
                placeholder="Surface max"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-strokedark dark:bg-boxdark focus:ring-2 focus:ring-primary"
                value={filters.maxSurface}
                onChange={(e) => setFilters({ ...filters, maxSurface: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: Property }) {
  const isNew = () => {
    const propertyDate = new Date(property.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - propertyDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const images = property.images?.length ? property.images : [property.imageUrl];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Reset tooltip visibility when mouse enters the center area
  const handleCenterAreaMouseEnter = () => {
    setShowTooltip(true);
  };

  return (
    <div className='group relative bg-white dark:bg-boxdark rounded-2xl shadow-lg overflow-hidden 
                    transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl
                    hover:shadow-primary/20 cursor-pointer'>
      {/* Image Container */}
      <div className='relative h-64 overflow-hidden'>
        {isNew() && (
          <div className='absolute top-4 right-4 z-20'>
            <div className='bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full
                          shadow-lg backdrop-blur-sm animate-pulse'>
              Nouveau
            </div>
          </div>
        )}
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className='absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full
                       bg-black/30 text-white hover:bg-black/50 transition-colors
                       backdrop-blur-sm opacity-0 group-hover:opacity-100'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className='absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full
                       bg-black/30 text-white hover:bg-black/50 transition-colors
                       backdrop-blur-sm opacity-0 group-hover:opacity-100'
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Center area for tooltip trigger */}
        <div 
          className='absolute top-0 left-1/4 right-1/4 h-full z-10'
          onMouseEnter={handleCenterAreaMouseEnter}
        />

        {/* Image */}
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className='w-full h-full object-cover transition-transform duration-700 ease-in-out 
                     group-hover:scale-110'
        />

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5'>
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-colors
                          ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'/>

        {/* Location Badge */}
        <div className='absolute bottom-4 left-4 z-10'>
          <div className='flex items-center text-white bg-black/30 backdrop-blur-sm 
                         rounded-lg px-3 py-1.5 transition-all duration-300
                         group-hover:bg-black/50'>
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {property.location}
          </div>
        </div>

        {/* Rental Info Tooltip - Modified to respect showTooltip state */}
        <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center 
                       opacity-0 ${showTooltip ? 'group-hover:opacity-100' : ''} transition-opacity duration-300`}>
          <div className='bg-black/70 backdrop-blur-md p-6 rounded-xl transform 
                         translate-y-4 group-hover:translate-y-0 transition-transform duration-300
                         text-white shadow-xl mx-4'>
            <div className='grid grid-cols-3 gap-6'>
              {/* Rendement Brut */}
              <div className='text-center'>
                <div className='text-primary font-bold text-2xl mb-1'>
                  5.2%
                </div>
                <div className='text-xs text-gray-300'>
                  Rendement Brut
                </div>
              </div>

              {/* Rendement Ville */}
              <div className='text-center border-x border-gray-500/30 px-4'>
                <div className='text-green-400 font-bold text-2xl mb-1'>
                  4.8%
                </div>
                <div className='text-xs text-gray-300'>
                  Rendement Ville
                </div>
              </div>

              {/* Loyer Conseillé */}
              <div className='text-center'>
                <div className='text-white font-bold text-2xl mb-1'>
                  {Math.round(property.price * 0.004).toLocaleString()}€
                </div>
                <div className='text-xs text-gray-300'>
                  Loyer Conseillé
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className='mt-4 pt-4 border-t border-gray-500/30 text-center'>
              <span className='text-xs text-gray-300'>
                Rentabilité supérieure à la moyenne de la ville
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='p-5'>
        <div className='flex justify-between items-start mb-4'>
          <h3 className='text-lg font-bold text-black dark:text-white line-clamp-1 
                        group-hover:text-primary transition-colors duration-300'>
            {property.title}
          </h3>
          <span className='text-primary font-bold text-lg'>
            {property.price.toLocaleString()}€
          </span>
        </div>

        {/* Description and Analysis Container */}
        <div className='bg-gray-50 dark:bg-boxdark-2 rounded-xl p-4 mb-4'>
          {/* Description */}
          <p className='text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3'>
            {property.description}
          </p>
          
          {/* Market Analysis */}
          <div className='border-t border-gray-200 dark:border-gray-700 pt-3'>
            <h4 className='text-sm font-semibold text-primary mb-2'>Analyse du marché</h4>
            <div className='grid grid-cols-2 gap-3 text-xs'>
              <div className='flex flex-col'>
                <span className='text-gray-500 dark:text-gray-400'>Prix/m²</span>
                <span className='font-medium text-black dark:text-white'>
                  {Math.round(property.price / property.surface).toLocaleString()}€
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 dark:text-gray-400'>Prix moyen du quartier</span>
                <span className='font-medium text-black dark:text-white'>
                  {(property.price * 0.95).toLocaleString()}€
                </span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 dark:text-gray-400'>Potentiel locatif</span>
                <span className='font-medium text-green-500'>Élevé</span>
              </div>
              <div className='flex flex-col'>
                <span className='text-gray-500 dark:text-gray-400'>Évolution prix</span>
                <span className='font-medium text-primary'>+3.5% /an</span>
              </div>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className='grid grid-cols-2 gap-3 mb-4'>
          <div className='flex items-center text-gray-600 dark:text-gray-400 text-sm 
                         group-hover:text-primary transition-colors duration-300'>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            {property.surface}m²
          </div>
          <div className='flex items-center text-gray-600 dark:text-gray-400 text-sm 
                         group-hover:text-primary transition-colors duration-300'>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            {property.bedrooms} chambres
          </div>
        </div>

        {/* Features Tags */}
        <div className='flex flex-wrap gap-1.5'>
          {property.features.map((feature, index) => (
            <span 
              key={index}
              className='bg-gray-100 dark:bg-boxdark-2 text-gray-600 dark:text-gray-400 
                         text-xs px-2.5 py-1 rounded-full transform transition-all duration-300
                         hover:scale-105 hover:bg-primary hover:text-white'
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
