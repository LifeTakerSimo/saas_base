import React, { useState, useEffect } from 'react';
import ProjectInputModal from '../components/ProjectInputModal';
import { motion } from 'framer-motion';
import { TrendingUp, Home, Euro, MapPin, ChartBar, Calculator, AlertCircle, ChevronDown, ChevronUp, Building, Briefcase, FileText, Settings, Save, Plus, Check, X, Trash2 } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import toast, { Toaster } from 'react-hot-toast';
import { createProject, getUserProjects, updateProject, deleteProject } from 'wasp/client/operations';
import { useQuery } from 'wasp/client/operations';
import { useAuth } from 'wasp/client/auth';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ProjectData {
  price: string;
  city: string;
  surface: string;
  propertyType?: string;
  condition?: string;
}

interface ProjectAnalysis {
  monthlyPayment: number;
  totalInterest: number;
  rentalYield: number;
  estimatedRent: number;
  roi: number;
  breakEvenPoint: number;
}

interface CollapsibleSectionProps {
  title: string;
  icon: any;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

interface SavedProject {
  id: string;
  name: string;
  createdAt: string;
  price: string;
  city: string;
  surface: string;
  propertyType?: string;
  condition?: string;
  analysis: ProjectAnalysis;
  monthlyPayment: number;
  estimatedRent: number;
  rentalYield: number;
  isEditing?: boolean;
}

const CollapsibleSection = ({ title, icon: Icon, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-500/10 rounded-lg">
            <Icon className="w-5 h-5 text-violet-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      {isOpen && <div className="p-6 border-t border-gray-800">{children}</div>}
    </div>
  );
};

const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  suffix = "", 
  options = [] as (string | number)[],
  disabled = false 
}: {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  suffix?: string;
  options?: (string | number)[];
  disabled?: boolean;
}) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-400">{label}</label>
    <div className="relative">
      {options.length > 0 ? (
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      )}
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

const CITIES = [
  "Paris", "Lyon", "Marseille", "Bordeaux", "Toulouse", "Nantes", "Strasbourg", "Lille"
];

const LOAN_DURATIONS = [10, 15, 20, 25, 30];

const PROPERTY_TYPES = [
  "Appartement",
  "Maison",
  "Studio",
  "Loft",
  "Duplex"
];

const PROPERTY_CONDITIONS = [
  "Neuf",
  "Excellent état",
  "Bon état",
  "À rénover",
  "À restaurer"
];

const CITY_PRICE_DATA: Record<string, number> = {
  "Casablanca": 25000,
  "Rabat": 22000,
  "Marrakech": 18000,
  "Tanger": 16000,
  "Agadir": 15000,
  "Fès": 14000,
  // ... add other Moroccan cities
};

const generatePriceEvolution = (basePrice: number) => {
  return [basePrice * 0.85, basePrice * 0.9, basePrice * 0.95, basePrice, basePrice * 1.05, basePrice * 1.1, basePrice * 1.15];
};

const PriceEvolutionChart = ({ city }: { city: keyof typeof CITY_PRICE_DATA }) => {
  const data = {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Prix au m²',
        data: generatePriceEvolution(CITY_PRICE_DATA[city] || 3000),
        borderColor: 'rgb(124, 58, 237)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-900/50 rounded-xl">
      <Line data={data} options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              color: 'white'
            }
          },
          title: {
            display: true,
            text: `Évolution des prix à ${city}`,
            color: 'white'
          }
        },
        scales: {
          y: {
            ticks: { color: 'white' }
          },
          x: {
            ticks: { color: 'white' }
          }
        }
      }} />
    </div>
  );
};

const calculateMonthlyPayment = (principal: number, annualRate: number, years: number) => {
  const monthlyRate = annualRate / 12 / 100;
  const numberOfPayments = years * 12;
  return principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) 
         / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
};

const generatePricePredictionData = (initialPrice: number, years: number = 10) => {
  const annualAppreciation = 0.035; // 3.5% annual appreciation
  const labels = Array.from({length: years + 1}, (_, i) => `${new Date().getFullYear() + i}`);
  const data = Array.from({length: years + 1}, (_, i) => 
    initialPrice * Math.pow(1 + annualAppreciation, i)
  );
  
  return { labels, data };
};

const PricePredictionChart = ({ initialPrice }: { initialPrice: number }) => {
  const { labels, data } = generatePricePredictionData(initialPrice);
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Prix estimé',
        data: data,
        borderColor: 'rgb(124, 58, 237)',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Évolution estimée du prix',
        color: 'white'
      }
    },
    scales: {
      y: {
        ticks: { 
          color: 'white',
          callback: function(value: number | string) {
            return `${(Number(value)/1000).toFixed(0)}k€`;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: { color: 'white' },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg col-span-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

const SaveProjectModal = ({ 
  isOpen, 
  onClose, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (name: string) => void; 
}) => {
  const [projectName, setProjectName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-gray-900/90 via-black/90 to-black/90 border-2 border-purple-500/30 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-white mb-4">Sauvegarder le projet</h3>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Nom du projet"
          className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-2 text-white mb-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              if (projectName.trim()) {
                onSave(projectName);
                setProjectName('');
                onClose();
              }
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

const SaveButton = ({ projectData, analysis, loanDuration, interestRate, selectedProjectId }: { 
  projectData: ProjectData; 
  analysis: ProjectAnalysis;
  loanDuration: number;
  interestRate: number;
  selectedProjectId?: string;
}) => {
  const { data: existingProjects = [], error, refetch } = useQuery<SavedProject[], void>(getUserProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(0);
  const SAVE_COOLDOWN = 3000; 

  const handleSave = async () => {
    const now = Date.now();
    if (isLoading || (now - lastSaveTime < SAVE_COOLDOWN)) {
      toast.error('Veuillez patienter avant de sauvegarder à nouveau');
      return;
    }

    try {
      setIsLoading(true);
      setLastSaveTime(now);

      const projectPayload = {
        name: `Projet ${projectData.city}`,
        price: parseFloat(projectData.price),
        city: projectData.city,
        surface: parseFloat(projectData.surface),
        propertyType: projectData.propertyType,
        condition: projectData.condition,
        loanDuration,
        interestRate,
        monthlyPayment: analysis.monthlyPayment,
        estimatedRent: analysis.estimatedRent,
        notaryFees: 0,
        renovationCost: 0,
        personalContribution: 50000,
        rentalYield: analysis.rentalYield,
      };

      const projectExists = existingProjects.some(
        (project: SavedProject) => project.city === projectData.city && 
                  project.surface === projectData.surface &&
                  project.price === projectData.price
      );

      if (projectExists && !selectedProjectId) {
        toast.error('Un projet similaire existe déjà!');
        return;
      }

      if (selectedProjectId) {
        await updateProject({
          id: selectedProjectId,
          ...projectPayload
        });
        toast.success('Projet mis à jour avec succès!');
      } else {
        await createProject(projectPayload);
        toast.success('Projet sauvegardé avec succès!');
      }
      await refetch();
    } catch (error) {
      toast.error(selectedProjectId ? 
        'Erreur lors de la mise à jour du projet' : 
        'Erreur lors de la sauvegarde du projet'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isLoading}
      className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 
                 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl 
                 font-medium transition-all duration-300 transform 
                 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95'}
                 flex items-center gap-2`}
    >
      <Save className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
      {isLoading ? 'Sauvegarde...' : (selectedProjectId ? 'Mettre à jour' : 'Sauvegarder le projet')}
    </button>
  );
};

const ProjectsSidebar = ({ 
  onSelect, 
  isExpanded, 
  onToggle,
  selectedProjectId 
}: {
  onSelect: (project: SavedProject) => void;
  isExpanded: boolean;
  onToggle: () => void;
  selectedProjectId?: string;
}) => {
  const { data: projects = [], error, refetch } = useQuery<SavedProject[], void>(getUserProjects);

  const handleDelete = async (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteProject({ id: projectId });
      toast.success('Projet supprimé avec succès');
      refetch();
    } catch (error) {
      toast.error('Erreur lors de la suppression du projet');
    }
  };

  return (
    <motion.div 
      initial={false}
      animate={{ width: isExpanded ? 320 : 64 }}
      className="fixed left-0 top-0 h-screen
                 bg-gradient-to-b from-gray-900 via-black to-black 
                 border-r border-gray-800 transition-colors duration-300 z-30"
      onMouseEnter={() => !isExpanded && onToggle()}
      onMouseLeave={() => isExpanded && onToggle()}
    >
      <div className="pt-16 h-full"> {/* Add padding-top to account for navbar */}
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-center mb-6">
            <FileText className="w-5 h-5 text-purple-400" />
          </div>

          <div className="space-y-3">
            {Array.isArray(projects) && projects.length > 0 ? (
              projects.map((project: SavedProject) => (
                <motion.button
                  key={project.id}
                  onClick={() => onSelect(project)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full transition-all duration-300 group relative
                             ${!isExpanded ? 'py-3' : 'p-4 text-left'} rounded-xl
                             ${selectedProjectId === project.id 
                               ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/50' 
                               : 'hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-blue-900/30 border border-gray-800'} 
                             transition-all duration-300`}
                >
                  {!isExpanded ? (
                    <div className="relative flex flex-col items-center justify-center">
                      <div className={`rounded-full p-2 transition-all duration-300
                                    ${selectedProjectId === project.id 
                                      ? 'bg-purple-500/20 text-purple-400' 
                                      : 'text-gray-400 group-hover:text-purple-400'}`}>
                        <Building className="w-6 h-6" />
                      </div>
                      <div className="absolute -right-1 top-0">
                        {project.analysis?.rentalYield > 6 && (
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        )}
                      </div>
                      <div className="mt-1 text-[10px] font-medium 
                                    text-gray-500 group-hover:text-purple-400">
                        {project.city.substring(0, 3)}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center gap-2 mb-3">
                        {project.isEditing ? (
                          <input
                            type="text"
                            value={project.name}
                            autoFocus
                            onBlur={async (e) => {
                              try {
                                await updateProject({
                                  id: project.id,
                                  name: e.target.value,
                                });
                                refetch();
                              } catch (error) {
                                toast.error('Erreur lors de la mise à jour du nom');
                              }
                              project.isEditing = false;
                            }}
                            className="text-white font-medium bg-transparent text-center w-full 
                                     hover:bg-black/30 focus:bg-black/30 rounded px-2 py-1
                                     focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                          />
                        ) : (
                          <div 
                            onDoubleClick={() => project.isEditing = true}
                            className="text-white font-medium cursor-pointer hover:text-purple-400"
                          >
                            {project.name}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 group-hover:text-purple-500/70">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <MapPin className="w-4 h-4" />
                          {project.city}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <Euro className="w-4 h-4" />
                          {parseInt(project.price).toLocaleString()}€
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <Home className="w-4 h-4" />
                          {project.surface} m²
                        </div>
                      </div>
                      <div className="mt-2 text-xs font-medium">
                        <span className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-400">
                          Rendement: {project.analysis?.rentalYield?.toFixed(1) ?? 'N/A'}%
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleDelete(project.id, e)}
                        className="absolute bottom-2 right-2 p-2 rounded-full 
                                  opacity-0 group-hover:opacity-100 transition-opacity
                                  hover:bg-red-500/10 text-red-400"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </motion.button>
              ))
            ) : (
              <div className={`text-center text-gray-500 py-4 ${!isExpanded && 'hidden'}`}>
                Aucun projet sauvegardé
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function NouveauProjet() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null);
  const [loanDuration, setLoanDuration] = useState(25);
  const [interestRate, setInterestRate] = useState(3.5);
  const [insurance, setInsurance] = useState(50);
  const [notaryFees, setNotaryFees] = useState(0);
  const [fileFees, setFileFees] = useState(1200);
  const [agencyFees, setAgencyFees] = useState(0);
  const [renovationCost, setRenovationCost] = useState(0);
  const [personalContribution, setPersonalContribution] = useState(50000);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: user } = useAuth();
  const { data: existingProjects = [] } = useQuery(getUserProjects);
  
  const calculateProjectAnalysis = (data: ProjectData, currentInsurance: number = 0): ProjectAnalysis => {
    const price = parseFloat(data.price);
    const surface = parseFloat(data.surface);
    
    // Monthly loan payment calculation
    const monthlyPayment = calculateMonthlyPayment(price, interestRate, loanDuration);
    const totalMonthlyPayment = monthlyPayment + currentInsurance;
    
    // Total interest over loan duration
    const totalInterest = (monthlyPayment * loanDuration * 12) - price;
    
    // Rental calculations
    const estimatedRent = surface * (CITY_PRICE_DATA[data.city as keyof typeof CITY_PRICE_DATA] || 15000) / 200;
    
    // Rendement locatif (Rental Yield) = (Annual Rent / Total Investment) * 100
    const totalInvestment = price + notaryFees + fileFees + agencyFees + renovationCost;
    const rentalYield = ((estimatedRent * 12) / totalInvestment) * 100;
    
    // ROI calculation including all costs and rental income
    const annualCosts = (totalMonthlyPayment * 12) + (totalInvestment * 0.01); // Including 1% maintenance
    const annualIncome = estimatedRent * 12;
    const annualProfit = annualIncome - annualCosts;
    const roi = Number(((annualProfit / totalInvestment) * 100).toFixed(2));
    
    // Point d'équilibre (Break-even point) considering all costs
    const monthlyProfit = estimatedRent - totalMonthlyPayment;
    const breakEvenPoint = monthlyProfit > 0 ? totalInvestment / (monthlyProfit * 12) : 99;

    return {
      monthlyPayment: totalMonthlyPayment,
      totalInterest,
      rentalYield,
      estimatedRent,
      roi,
      breakEvenPoint
    };
  };

  const handleProjectSelect = async (data: ProjectData) => {
    if (!user?.subscriptionPlan) {
      // Free trial check
      if (existingProjects.length >= 3) {
        toast.error('Limite de 3 projets atteinte. Veuillez passer à un forfait payant.');
        return;
      }
    } else if (user.subscriptionPlan === 'standard') {
      if (existingProjects.length >= 10) {
        toast.error('Limite de 10 projets atteinte. Veuillez passer au forfait Entreprise.');
        return;
      }
    }

    // Set the project data and calculate analysis
    setProjectData(data);
    setAnalysis(calculateProjectAnalysis(data));
    setIsModalOpen(false);
  };

  const handleSavedProjectSelect = (project: SavedProject) => {
    setSelectedProjectId(project.id);
    setProjectData({
      price: project.price.toString(),
      city: project.city,
      surface: project.surface.toString(),
      propertyType: project.propertyType,
      condition: project.condition
    });
    setAnalysis(calculateProjectAnalysis({
      price: project.price.toString(),
      city: project.city,
      surface: project.surface.toString(),
      propertyType: project.propertyType,
      condition: project.condition
    }));
  };

  const AnalysisCard = ({ title, value, icon: Icon, subtitle }: {
    title: string;
    value: string | number;
    icon: any;
    subtitle: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 
                 hover:border-violet-500/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-violet-500/10 rounded-lg">
          <Icon className="w-5 h-5 text-violet-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400">{subtitle}</div>
      </div>
    </motion.div>
  );

  const handleSaveProject = (name: string) => {
    if (!projectData || !analysis) return;

    const newProject: SavedProject = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
      ...projectData,
      analysis,
      monthlyPayment: analysis.monthlyPayment,
      estimatedRent: analysis.estimatedRent,
      rentalYield: analysis.rentalYield,
      isEditing: false,
    };

    setSavedProjects([...savedProjects, newProject]);
    localStorage.setItem('savedProjects', JSON.stringify([...savedProjects, newProject]));
    
    // Show success notification
    toast.success(`Le projet "${name}" a été sauvegardé avec succès.`);
  };

  useEffect(() => {
    const saved = localStorage.getItem('savedProjects');
    if (saved) {
      setSavedProjects(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || !projectData) return;
    
    // Check for duplicate project
    const existingProjects = await getUserProjects();
    const isDuplicate = existingProjects.some(
      (project: SavedProject) => 
        project.city === projectData.city && 
        project.surface === projectData.surface &&
        project.price === projectData.price &&
        Date.now() - new Date(project.createdAt).getTime() < 60000
    );

    if (isDuplicate) {
      toast.error('Un projet identique a été créé récemment. Veuillez patienter un moment.');
      return;
    }

    try {
      setIsSubmitting(true);
      await createProject({
        ...projectData,
        name: `Projet ${projectData.city}`
      });
      toast.success('Projet créé avec succès!');
    } catch (error) {
      toast.error('Erreur lors de la création du projet');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update the analysis whenever relevant values change
  useEffect(() => {
    if (projectData) {
      setAnalysis(calculateProjectAnalysis(projectData, insurance));
    }
  }, [
    projectData,
    insurance,
    loanDuration,
    interestRate,
    notaryFees,
    fileFees,
    agencyFees,
    renovationCost,
    personalContribution
  ]);

  return (
    <div className="flex">
      <Toaster position="top-right" />
      <ProjectsSidebar 
        onSelect={handleSavedProjectSelect}
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
        selectedProjectId={selectedProjectId}
      />
      <div className={`transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-16'} flex-1`}>
        <div className="container mx-auto p-8">
          {projectData && analysis ? (
            <div className="space-y-8">
              {/* Project Header with Save Button */}
              <div className="flex justify-between items-center">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent 
                               bg-gradient-to-r from-violet-400 to-purple-400">
                    Analyse d'Investissement
                  </h1>
                  <div className="flex items-center gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {projectData.city}
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      {projectData.surface} m²
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4" />
                      {parseInt(projectData.price).toLocaleString()}€
                    </div>
                  </div>
                </div>
                <SaveButton 
                  projectData={projectData} 
                  analysis={analysis} 
                  loanDuration={loanDuration}
                  interestRate={interestRate}
                  selectedProjectId={selectedProjectId}
                />
              </div>

              {/* Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnalysisCard
                  title="Mensualité Estimée"
                  value={`${analysis.monthlyPayment.toLocaleString()} DH`}
                  icon={Calculator}
                  subtitle="par mois"
                />
                <AnalysisCard
                  title="Intérêts Totaux"
                  value={`${analysis.totalInterest.toLocaleString()} DH`}
                  icon={Euro}
                  subtitle="sur la durée du prêt"
                />
                <AnalysisCard
                  title="Loyer Estimé"
                  value={`${analysis.estimatedRent.toLocaleString()} DH`}
                  icon={Home}
                  subtitle="par mois"
                />
                <AnalysisCard
                  title="Rendement Locatif"
                  value={`${analysis.rentalYield.toFixed(2)}%`}
                  icon={TrendingUp}
                  subtitle="rendement brut annuel"
                />
                <AnalysisCard
                  title="Retour sur Investissement"
                  value={`${analysis.roi.toFixed(2)}%`}
                  icon={ChartBar}
                  subtitle="ROI projeté"
                />
                <AnalysisCard
                  title="Point d'Équilibre"
                  value={`${analysis.breakEvenPoint.toFixed(1)} ans`}
                  icon={AlertCircle}
                  subtitle="temps de rentabilisation"
                />
              </div>

              {/* Detailed Analysis Sections */}
              <div className="space-y-6">
                <CollapsibleSection 
                  title="Simulation de Prêt" 
                  icon={Calculator}
                  defaultOpen={true}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InputField
                      label="Durée"
                      value={loanDuration}
                      onChange={(e) => {
                        setLoanDuration(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      options={LOAN_DURATIONS}
                      suffix="ans"
                    />
                    <InputField
                      label="Taux d'intérêt"
                      value={interestRate}
                      onChange={(e) => {
                        setInterestRate(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="%"
                    />
                    <InputField
                      label="Mensualité"
                      value={analysis.monthlyPayment.toFixed(2)}
                      onChange={() => {}}
                      disabled={true}
                      suffix="DH/mois"
                    />
                    <InputField
                      label="Assurance"
                      value={insurance}
                      onChange={(e) => {
                        const newInsurance = Number(e.target.value);
                        setInsurance(newInsurance);
                        if (projectData) {
                          setAnalysis(calculateProjectAnalysis(projectData, newInsurance));
                        }
                      }}
                      suffix="DH/mois"
                    />
                    <InputField
                      label="Coût total du crdit"
                      value={analysis.totalInterest.toFixed(2)}
                      onChange={() => {/* handle change */}}
                      suffix="DH"
                    />
                  </div>
                </CollapsibleSection>

                <CollapsibleSection 
                  title="Détails du Bien" 
                  icon={Building}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InputField
                      label="Ville"
                      value={projectData.city}
                      onChange={(e) => {
                        const newData = { ...projectData, city: e.target.value };
                        setProjectData(newData);
                        setAnalysis(calculateProjectAnalysis(newData));
                      }}
                      options={CITIES}
                    />
                    <InputField
                      label="Surface"
                      value={projectData.surface}
                      onChange={(e) => {
                        const newData = { ...projectData, surface: e.target.value };
                        setProjectData(newData);
                        setAnalysis(calculateProjectAnalysis(newData));
                      }}
                      suffix="m²"
                    />
                    <InputField
                      label="Type de bien"
                      value={projectData.propertyType || "Appartement"}
                      onChange={(e) => {
                        const newData = { ...projectData, propertyType: e.target.value };
                        setProjectData(newData);
                      }}
                      options={PROPERTY_TYPES}
                    />
                    <InputField
                      label="État du bien"
                      value={projectData.condition || "Bon état"}
                      onChange={(e) => {
                        const newData = { ...projectData, condition: e.target.value };
                        setProjectData(newData);
                      }}
                      options={PROPERTY_CONDITIONS}
                    />
                  </div>
                </CollapsibleSection>

                <CollapsibleSection 
                  title="Frais d'Investissement" 
                  icon={Briefcase}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InputField
                      label="Frais de notaire"
                      value={notaryFees}
                      onChange={(e) => {
                        setNotaryFees(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="DH"
                    />
                    <InputField
                      label="Frais de dossier"
                      value={fileFees}
                      onChange={(e) => {
                        setFileFees(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="DH"
                    />
                    <InputField
                      label="Frais d'agence"
                      value={agencyFees}
                      onChange={(e) => {
                        setAgencyFees(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="DH"
                    />
                    <InputField
                      label="Travaux prévus"
                      value={renovationCost}
                      onChange={(e) => {
                        setRenovationCost(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="DH"
                    />
                    <InputField
                      label="Apport personnel"
                      value={personalContribution}
                      onChange={(e) => {
                        setPersonalContribution(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="DH"
                    />
                    <InputField
                      label="Coût total de l'opération"
                      value={(parseInt(projectData.price) + notaryFees + fileFees + agencyFees + renovationCost).toFixed(2)}
                      disabled={true}
                      onChange={() => {}}
                      suffix="DH"
                    />
                  </div>
                </CollapsibleSection>

                <CollapsibleSection 
                  title="Analyse Prédictive" 
                  icon={TrendingUp}
                >
                  <div className="space-y-6">
                    <PricePredictionChart initialPrice={parseInt(projectData.price)} />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-3">Projection à 10 ans</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Prix d'achat</span>
                            <span className="text-white">{parseInt(projectData.price).toLocaleString()} DH</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Valeur estimée</span>
                            <span className="text-white">
                              {(parseInt(projectData.price) * Math.pow(1.035, 10)).toLocaleString()} DH
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Plus-value potentielle</span>
                            <span className="text-green-400">
                              {((Math.pow(1.035, 10) - 1) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-3">Évolution du Marché</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tendance annuelle</span>
                            <span className="text-green-400">+3.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Demande locative</span>
                            <span className="text-white">Forte</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Indice de tension</span>
                            <span className="text-orange-400">8.5/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <h4 className="text-white font-medium mb-3">Analyse des Risques</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Niveau de risque</span>
                            <span className="text-yellow-400">Modéré</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Vacance locative</span>
                            <span className="text-white">~4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Stabilité du marché</span>
                            <span className="text-green-400">Élevée</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleSection>
              </div>
            </div>
          ) : (
            <div className="h-[80vh] flex flex-col items-center justify-center">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 
                           text-white rounded-2xl font-medium shadow-lg 
                           hover:shadow-violet-500/25 transition-all duration-300
                           flex items-center gap-3"
              >
                <Plus className="w-5 h-5" />
                <span>Créer un Nouveau Projet d'Investissement</span>
              </motion.button>
              <p className="mt-4 text-gray-400 text-center">
                Commencez par créer un nouveau projet pour analyser votre investissement
              </p>
            </div>
          )}
          <ProjectInputModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleProjectSelect}
          />
          <SaveProjectModal
            isOpen={showSaveModal}
            onClose={() => {
              setShowSaveModal(false);
              setProjectName('');
            }}
            onSave={handleSaveProject}
          />
        </div>
      </div>
    </div>
  );
} 