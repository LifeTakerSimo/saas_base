import React, { useState, useEffect } from 'react';
import ProjectInputModal from '../components/ProjectInputModal';
import { motion } from 'framer-motion';
import { TrendingUp, Home, Euro, MapPin, ChartBar, Calculator, AlertCircle, ChevronDown, ChevronUp, Building, Briefcase, FileText, Settings, Save, Plus } from 'lucide-react';
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
import toast from 'react-hot-toast';
import { createProject, getUserProjects } from 'wasp/client/operations';
import { useQuery } from 'wasp/client/operations';

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

interface SavedProject extends ProjectData {
  id: string;
  name: string;
  createdAt: string;
  analysis: ProjectAnalysis;
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
  "Paris": 10500,
  "Lyon": 5200,
  "Marseille": 3800,
  // ... add other cities
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

const SaveButton = ({ projectData, analysis, loanDuration, interestRate }: { 
  projectData: ProjectData; 
  analysis: ProjectAnalysis;
  loanDuration: number;
  interestRate: number;
}) => {
  const handleSave = async () => {
    try {
      await createProject({
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
      });
      toast.success('Projet sauvegardé avec succès!');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde du projet');
    }
  };

  return (
    <button
      onClick={handleSave}
      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 
                 hover:from-purple-700 hover:to-blue-600 text-white rounded-xl 
                 font-medium transition-all duration-300 transform 
                 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 
                 active:scale-95 flex items-center gap-2"
    >
      <Save className="w-4 h-4" />
      Sauvegarder le projet
    </button>
  );
};

const ProjectsSidebar = ({ 
  onSelect, 
  isExpanded, 
  onToggle 
}: {
  onSelect: (project: SavedProject) => void;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const { data: projects = [], isLoading } = useQuery<SavedProject[], void>(getUserProjects);

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div 
      className={`fixed left-0 top-[64px] h-[calc(100vh-64px)] 
                  bg-gradient-to-b from-gray-900 via-black to-black 
                  border-r border-gray-800 transition-all duration-300 z-40 
                  ${isExpanded ? 'w-64' : 'w-16'} hover:w-64`}
      onMouseEnter={() => onToggle()}
      onMouseLeave={() => onToggle()}
    >
      <div className="p-4">
        <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} mb-4`}>
          <h2 className={`text-lg font-semibold bg-clip-text text-transparent 
                         bg-gradient-to-r from-purple-400 to-pink-400 
                         whitespace-nowrap transition-opacity duration-300
                         ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            Mes Projets
          </h2>
          <FileText className={`w-5 h-5 text-purple-400 ${isExpanded ? 'hidden' : 'block'}`} />
        </div>
        <div className={`space-y-2 transition-opacity duration-300 
                        ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelect(project)}
                className="w-full text-left p-3 rounded-lg bg-black/50 
                         hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-blue-900/30 
                         border border-gray-800 hover:border-purple-500/30 
                         transition-all duration-300"
              >
                <div className="text-white font-medium">{project.name}</div>
                <div className="text-sm text-gray-400">{project.city}</div>
                <div className="text-sm text-gray-400">
                  {parseInt(project.price).toLocaleString()}€
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </button>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">
              Aucun projet sauvegardé
            </div>
          )}
        </div>
      </div>
    </div>
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

  const calculateProjectAnalysis = (data: ProjectData): ProjectAnalysis => {
    const price = parseFloat(data.price);
    const surface = parseFloat(data.surface);
    
    const monthlyPayment = calculateMonthlyPayment(price, interestRate, loanDuration);
    const totalInterest = (monthlyPayment * loanDuration * 12) - price;
    const estimatedRent = surface * (CITY_PRICE_DATA[data.city] || 15) / 200; // Estimated monthly rent
    const rentalYield = (estimatedRent * 12) / price * 100;
    const roi = 8.5;
    const breakEvenPoint = price / (estimatedRent * 12);

    return {
      monthlyPayment,
      totalInterest,
      rentalYield,
      estimatedRent,
      roi,
      breakEvenPoint
    };
  };

  const handleModalSubmit = (data: ProjectData) => {
    setProjectData(data);
    const projectAnalysis = calculateProjectAnalysis(data);
    setAnalysis(projectAnalysis);
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
      analysis
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

  return (
    <div className="flex">
      <ProjectsSidebar 
        onSelect={(project) => {
          setProjectData(project);
          setAnalysis(project.analysis);
        }}
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
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
                />
              </div>

              {/* Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnalysisCard
                  title="Mensualité Estimée"
                  value={`${analysis.monthlyPayment.toLocaleString()}€`}
                  icon={Calculator}
                  subtitle="par mois"
                />
                <AnalysisCard
                  title="Intérêts Totaux"
                  value={`${analysis.totalInterest.toLocaleString()}€`}
                  icon={Euro}
                  subtitle="sur la durée du prêt"
                />
                <AnalysisCard
                  title="Loyer Estimé"
                  value={`${analysis.estimatedRent.toLocaleString()}€`}
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
                  value={`${analysis.roi}%`}
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
                      suffix="€/mois"
                    />
                    <InputField
                      label="Assurance"
                      value={insurance}
                      onChange={(e) => {
                        setInsurance(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="€/mois"
                    />
                    <InputField
                      label="Coût total du crdit"
                      value={analysis.totalInterest.toFixed(2)}
                      onChange={() => {/* handle change */}}
                      suffix="€"
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
                      suffix="€"
                    />
                    <InputField
                      label="Frais de dossier"
                      value={fileFees}
                      onChange={(e) => {
                        setFileFees(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="€"
                    />
                    <InputField
                      label="Frais d'agence"
                      value={agencyFees}
                      onChange={(e) => {
                        setAgencyFees(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="€"
                    />
                    <InputField
                      label="Travaux prévus"
                      value={renovationCost}
                      onChange={(e) => {
                        setRenovationCost(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="€"
                    />
                    <InputField
                      label="Apport personnel"
                      value={personalContribution}
                      onChange={(e) => {
                        setPersonalContribution(Number(e.target.value));
                        setAnalysis(calculateProjectAnalysis(projectData));
                      }}
                      suffix="€"
                    />
                    <InputField
                      label="Coût total de l'opération"
                      value={(parseInt(projectData.price) + notaryFees + fileFees + agencyFees + renovationCost).toFixed(2)}
                      disabled={true}
                      onChange={() => {}}
                      suffix="€"
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
                            <span className="text-white">{parseInt(projectData.price).toLocaleString()}€</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Valeur estimée</span>
                            <span className="text-white">
                              {(parseInt(projectData.price) * Math.pow(1.035, 10)).toLocaleString()}€
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
            onSubmit={handleModalSubmit}
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