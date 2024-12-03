import { Link } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Bell, Search, Building2, Calculator, TrendingUp, Plus, MapPin } from 'lucide-react';
import DropdownUser from '../../user/DropdownUser';

const simulateurs = [
  { name: 'Calculateur de prêt', icon: Calculator },
  { name: 'Rendement locatif', icon: TrendingUp },
];

const analyses = [
  { name: 'Analyse de marché', icon: Building2, route: '/market-analysis-page' },
  { name: 'Données démographiques', icon: TrendingUp, route: '/demographic-analysis' },
  { name: 'Tendances immobilières', icon: MapPin, route: '/real-estate-trends-page' },
] as const;

const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    y: -10,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn"
    }
  }
};

function calculateRemainingDays(endDate: Date): number {
  const today = new Date();
  
  const timeDiff = endDate.getTime() - today.getTime();
  const days = Math.ceil(timeDiff / (1000 * 3600 * 24));  
  return days;
}

export default function AppNavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [remainingDays, setRemainingDays] = useState<number | null>(null);
  const { data: user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      }
    }
  };
  
  useEffect(() => {
    if (user?.trialEndDate && (!user.subscriptionStatus || user.subscriptionStatus === 'deleted')) {
      const endDate = new Date(user.trialEndDate);
      const daysLeft = calculateRemainingDays(endDate);
      setRemainingDays(daysLeft > 0 ? daysLeft : null);
    } else {
      setRemainingDays(null);
    }
  }, [user]);

  return (
    <>
      <div className="h-16" />
      
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: 0, 
          scale: isScrolled ? 0.98 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 
          ${isScrolled 
            ? 'mx-auto max-w-7xl mt-2 rounded-2xl border border-gray-800 bg-black shadow-lg shadow-purple-950/20' 
            : 'w-full bg-black border-b border-gray-800'
          }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between relative">
            {/* Left Section - Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-purple-500"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                  ForsaImmo
                </span>
              </Link>
            </div>

            {/* Center Section - Navigation Items */}
            <div className="flex-1 flex items-center justify-center space-x-6">
              {/* Simulateurs Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('simulateurs')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <AnimatePresence>
                  {activeDropdown === 'simulateurs' && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 w-64 py-2 mt-1 
                        bg-black border border-gray-800 rounded-xl
                        shadow-lg shadow-purple-950/20"
                    >
                      {simulateurs.map((item, index) => (
                        <motion.button
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            transition: { delay: index * 0.1 }
                          }}
                          className="flex items-center space-x-3 px-4 py-3 w-full 
                            hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-transparent
                            transition-all duration-200 text-gray-300 hover:text-white 
                            group text-[15px] relative"
                        >
                          <item.icon className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                          <span className="relative">
                            {item.name}
                            <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-purple-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Recherche Link */}
              <Link 
                to="/demo-app" 
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                Recherche
              </Link>

              {/* Trial Days Message - Only show for free users in trial period */}
              {remainingDays !== null && (
                <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                  border-2 border-purple-500/30 shadow-lg shadow-purple-500/10 backdrop-blur-sm
                  hover:border-purple-500/50 transition-all duration-300">
                  <span className="text-sm font-medium text-white flex items-center space-x-2">
                    <svg 
                      className="w-4 h-4 text-purple-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    <span>
                      {remainingDays === 1 
                        ? "Dernier jour d'essai"
                        : `${remainingDays} jours d'essai restants`}
                    </span>
                  </span>
                </div>
              )}

              {/* Nouveau Projet Button */}
              <Link
                to="/nouveau-projet"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 
                  hover:from-purple-700 hover:to-blue-600 text-white rounded-lg 
                  transition-all duration-300 transform hover:scale-105 
                  hover:shadow-lg hover:shadow-purple-500/25 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau Projet</span>
              </Link>

              {/* Analyses Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setActiveDropdown('analyses')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 px-4 py-2 text-gray-300 hover:text-white transition-colors text-[15px]">
                  <span>Analyses</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'analyses' && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 w-64 py-2 mt-1 
                        bg-black border border-gray-800 rounded-xl
                        shadow-lg shadow-purple-950/20"
                    >
                      {analyses.map((item, index) => (
                        <Link
                          key={item.name}
                          to={item.route}
                          className="block w-full"
                        >
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ 
                              opacity: 1, 
                              x: 0,
                              transition: { delay: index * 0.1 }
                            }}
                            className="flex items-center space-x-3 px-4 py-3 w-full 
                              hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-transparent
                              transition-all duration-200 text-gray-300 hover:text-white 
                              group text-[15px] relative"
                          >
                            <item.icon className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                            <span className="relative">
                              {item.name}
                              <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-purple-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </span>
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Section - User Menu & Notifications */}
            <div className="flex-shrink-0 flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-300 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />
              </button>

              {/* User Menu */}
              <DropdownUser user={user ?? null} />
            </div>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
