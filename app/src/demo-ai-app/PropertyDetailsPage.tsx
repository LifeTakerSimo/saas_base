import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';
import { 
  Home, MapPin, TrendingUp, Calculator, ClipboardList,
  ChevronLeft, ArrowLeft
} from 'lucide-react';
import { useQuery } from 'wasp/client/operations';
import { getProperties } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

type Property = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  surface: number;
  type: string;
  status: string;
  condition: string | null;
  country: string;
  location?: string;
  quartier?: string;
  imageUrl: string;
  images: string[];
  features: string[];
  projectId: string | null;
  bedrooms: number;
  bathrooms: number;
}

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const mockProperties: Property[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Villa Moderne à Casablanca',
      description: 'Villa moderne avec piscine et jardin dans un quartier résidentiel.',
      price: 500000,
      surface: 300,
      type: 'villa',
      status: 'À vendre',
      condition: null,
      country: 'Morocco',
      location: 'Casablanca',
      quartier: 'Anfa',
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500',
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=500',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=500',
        'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?q=80&w=500',
      ],
      features: ['Piscine', 'Jardin', 'Garage'],
      projectId: null,
      bedrooms: 4,
      bathrooms: 3,
    },
  ];

  const property = mockProperties.find((prop) => prop.id === id);

  if (!property) return <div>Property not found</div>;

  const [activeTab, setActiveTab] = useState("details");

  const completeProperty: Property = {
    ...property,
    condition: property.condition || null,
    projectId: property.projectId || null,
    // Add default values for any other optional fields if necessary
  };

  return (
    <div className="min-h-screen">
      {/* Header Section - No background */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/demo"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux annonces
          </Link>
          
          <div className="mt-4 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-white">{property.title}</h1>
              <p className="text-gray-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {property.location}, {property.quartier}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {(property.price * 10.5).toLocaleString()} DH
              </div>
              <div className="text-gray-400">
                {Math.round(property.price * 10.5 / property.surface).toLocaleString()} DH/m²
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs - Clean design */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details" onClick={setActiveTab} isActive={activeTab === "details"}>
                <Home className="w-4 h-4 mr-2" />
                Annonce
              </TabsTrigger>
              <TabsTrigger value="city" onClick={setActiveTab} isActive={activeTab === "city"}>
                <MapPin className="w-4 h-4 mr-2" />
                Quartier
              </TabsTrigger>
              <TabsTrigger value="yield" onClick={setActiveTab} isActive={activeTab === "yield"}>
                <TrendingUp className="w-4 h-4 mr-2" />
                Rendement
              </TabsTrigger>
              <TabsTrigger value="tax" onClick={setActiveTab} isActive={activeTab === "tax"}>
                <Calculator className="w-4 h-4 mr-2" />
                Fiscalité
              </TabsTrigger>
              <TabsTrigger value="summary" onClick={setActiveTab} isActive={activeTab === "summary"}>
                <ClipboardList className="w-4 h-4 mr-2" />
                Récapitulatif
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <TabsContent value="details" activeTab={activeTab}>
            <PropertyDetails property={completeProperty} />
          </TabsContent>
          <TabsContent value="city" activeTab={activeTab}>
            <CityAnalysis property={property} />
          </TabsContent>
          <TabsContent value="yield" activeTab={activeTab}>
            <YieldAnalysis property={property} />
          </TabsContent>
          <TabsContent value="tax" activeTab={activeTab}>
            <TaxAnalysis property={property} />
          </TabsContent>
          <TabsContent value="summary" activeTab={activeTab}>
            <PropertySummary property={property} />
          </TabsContent>
        </div>
      </div>
    </div>
  );
}

// Tab Content Components
function PropertyDetails({ property }: { property: Property }) {
  return (
    <div className="space-y-8">
      {/* Image Gallery */}
      <div className="grid grid-cols-2 gap-4">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-[400px] object-cover rounded-xl shadow-lg border border-gray-700"
        />
        <div className="grid grid-cols-2 gap-4">
          {property.images.slice(0, 4).map((img, idx) => (
            <img 
              key={idx}
              src={img}
              alt={`${property.title} ${idx + 1}`}
              className="w-full h-[195px] object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-gray-700"
            />
          ))}
        </div>
      </div>

      {/* Key Information */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: "🏠", label: "Type", value: property.type },
          { icon: "💰", label: "Prix", value: `${(property.price * 10.5).toLocaleString()} DH` },
          { icon: "📏", label: "Surface", value: `${property.surface}m²` },
          { icon: "🏗️", label: "État", value: property.condition || "Bon état" },
          { icon: "🛏️", label: "Chambres", value: property.bedrooms },
          { icon: "🚿", label: "Salles de bain", value: property.bathrooms },
          { icon: "📍", label: "Quartier", value: property.quartier },
          { icon: "📅", label: "Disponibilité", value: "Immédiate" }
        ].map((item, idx) => (
          <div key={idx} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{item.icon}</span>
              <span className="text-gray-400 text-sm">{item.label}</span>
            </div>
            <div className="text-white font-semibold">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
        <p className="text-gray-300 leading-relaxed">{property.description}</p>
      </div>

      {/* Features */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Caractéristiques</h3>
        <div className="grid grid-cols-3 gap-4">
          {property.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CityAnalysis({ property }: { property: Property }) {
  const cityStats = {
    population: "3.4M",
    growthRate: "+2.3%",
    averagePrice: "4,200€/m²",
    priceEvolution: "+5.2%",
    studentPopulation: "280,000",
    transportScore: 8.5,
    schools: 245,
    hospitals: 18
  };

  return (
    <div className="space-y-8">
      {/* City Overview */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Aperçu de {property.location}</h3>
        <div className="grid grid-cols-4 gap-6">
          {[
            { label: "Population", value: cityStats.population },
            { label: "Croissance annuelle", value: cityStats.growthRate },
            { label: "Prix moyen/m²", value: cityStats.averagePrice },
            { label: "Évolution des prix", value: cityStats.priceEvolution }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Neighborhood Analysis */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Analyse du quartier {property.quartier}</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Scores */}
          <div className="space-y-4">
            {[
              { label: "Transport", score: 85 },
              { label: "Commerces", score: 92 },
              { label: "Écoles", score: 78 },
              { label: "Sécurité", score: 88 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="text-white font-medium">{item.score}/100</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Key Points */}
          <div className="bg-gray-900/50 rounded-xl p-4">
            <h4 className="text-white font-medium mb-3">Points clés du quartier</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Proximité des transports
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Quartier familial
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Nombreux espaces verts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Commerces à proximité
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function YieldAnalysis({ property }: { property: Property }) {
  const yieldData = {
    monthlyRent: Math.round(property.price * 0.004), // Estimated monthly rent
    annualRent: Math.round(property.price * 0.048), // Estimated annual rent
    rentalYield: 4.8, // Gross rental yield
    netYield: 3.9, // Net rental yield after expenses
    occupancyRate: 95, // Expected occupancy rate
    expenses: {
      maintenance: Math.round(property.price * 0.01), // Annual maintenance cost
      insurance: Math.round(property.price * 0.003), // Annual insurance cost
      propertyTax: Math.round(property.price * 0.005), // Annual property tax
      managementFees: Math.round(property.price * 0.048 * 0.08) // 8% of annual rent
    }
  };

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { 
            label: "Loyer mensuel estimé", 
            value: `${yieldData.monthlyRent.toLocaleString()}€`,
            color: "text-green-500"
          },
          { 
            label: "Rendement brut", 
            value: `${yieldData.rentalYield}%`,
            color: "text-blue-500"
          },
          { 
            label: "Rendement net", 
            value: `${yieldData.netYield}%`,
            color: "text-purple-500"
          },
          { 
            label: "Taux d'occupation", 
            value: `${yieldData.occupancyRate}%`,
            color: "text-yellow-500"
          }
        ].map((metric, idx) => (
          <div key={idx} 
               className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 
                        hover:border-purple-500/30 transition-all duration-300">
            <div className="text-gray-400 text-sm mb-2">{metric.label}</div>
            <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Annual Financial Breakdown */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Analyse financière annuelle</h3>
        <div className="grid grid-cols-2 gap-8">
          {/* Income */}
          <div>
            <h4 className="text-lg text-white mb-4">Revenus</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                <span className="text-gray-300">Revenu locatif</span>
                <span className="text-green-500 font-semibold">
                  {yieldData.annualRent.toLocaleString()}€
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                <span className="text-gray-300">Taux d'occupation</span>
                <span className="text-white font-semibold">{yieldData.occupancyRate}%</span>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div>
            <h4 className="text-lg text-white mb-4">Charges</h4>
            <div className="space-y-3">
              {Object.entries(yieldData.expenses).map(([key, value], idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                  <span className="text-gray-300">
                    {key === 'maintenance' ? 'Entretien' :
                     key === 'insurance' ? 'Assurance' :
                     key === 'propertyTax' ? 'Taxe foncière' :
                     'Frais de gestion'}
                  </span>
                  <span className="text-red-400 font-semibold">-{value.toLocaleString()}€</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ROI Projection */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Projection de rentabilité</h3>
        <div className="space-y-4">
          {[5, 10, 15, 20].map((years) => {
            const appreciation = property.price * Math.pow(1.02, years);
            const totalRent = yieldData.annualRent * years;
            const totalReturn = appreciation + totalRent - property.price;
            const roi = (totalReturn / property.price) * 100;

            return (
              <div key={years} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                <span className="text-gray-300">{years} ans</span>
                <div className="flex items-center gap-6">
                  <span className="text-blue-400">
                    Valeur: {Math.round(appreciation).toLocaleString()}€
                  </span>
                  <span className="text-green-400">
                    Loyers: {Math.round(totalRent).toLocaleString()}€
                  </span>
                  <span className="text-purple-400 font-semibold">
                    ROI: {roi.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TaxAnalysis({ property }: { property: Property }) {
  const taxData = {
    acquisitionCosts: {
      notaryFees: Math.round(property.price * 0.07),
      registrationTax: Math.round(property.price * 0.05),
      agencyFees: Math.round(property.price * 0.04)
    },
    annualTaxes: {
      propertyTax: Math.round(property.price * 0.005),
      housingTax: Math.round(property.price * 0.003),
      incomeText: Math.round(property.price * 0.048 * 0.3) // 30% of rental income
    },
    taxBenefits: {
      interestDeduction: Math.round(property.price * 0.02),
      depreciationAllowance: Math.round(property.price * 0.02),
      maintenanceDeduction: Math.round(property.price * 0.01)
    }
  };

  return (
    <div className="space-y-8">
      {/* Acquisition Costs */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Frais d'acquisition</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(taxData.acquisitionCosts).map(([key, value], idx) => (
            <div key={idx} className="bg-gray-900/50 p-4 rounded-lg">
              <div className="text-gray-400 text-sm mb-2">
                {key === 'notaryFees' ? 'Frais de notaire' :
                 key === 'registrationTax' ? 'Droits d\'enregistrement' :
                 'Frais d\'agence'}
              </div>
              <div className="text-xl font-semibold text-red-400">
                {value.toLocaleString()}€
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Annual Taxes */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Taxes annuelles</h3>
        <div className="space-y-4">
          {Object.entries(taxData.annualTaxes).map(([key, value], idx) => (
            <div key={idx} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg">
              <span className="text-gray-300">
                {key === 'propertyTax' ? 'Taxe foncière' :
                 key === 'housingTax' ? 'Taxe d\'habitation' :
                 'Impôt sur le revenu locatif'}
              </span>
              <span className="text-red-400 font-semibold">{value.toLocaleString()}€/an</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Benefits */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Avantages fiscaux</h3>
        <div className="space-y-4">
          {Object.entries(taxData.taxBenefits).map(([key, value], idx) => (
            <div key={idx} className="flex justify-between items-center p-4 bg-gray-900/50 rounded-lg">
              <span className="text-gray-300">
                {key === 'interestDeduction' ? 'Déduction des intérêts' :
                 key === 'depreciationAllowance' ? 'Amortissement' :
                 'Déduction des charges'}
              </span>
              <span className="text-green-400 font-semibold">+{value.toLocaleString()}€/an</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertySummary({ property }: { property: Property }) {
  return (
    <div className="space-y-8">
      {/* Investment Overview */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-6">Résumé de l'investissement</h3>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <div className="text-gray-400 mb-2">Prix d'acquisition</div>
              <div className="text-2xl font-bold text-white">
                {property.price.toLocaleString()}€
              </div>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <div className="text-gray-400 mb-2">Rendement net estimé</div>
              <div className="text-2xl font-bold text-green-500">3.9%</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <div className="text-gray-400 mb-2">Revenu locatif mensuel</div>
              <div className="text-2xl font-bold text-blue-500">
                {Math.round(property.price * 0.004).toLocaleString()}€
              </div>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-lg">
              <div className="text-gray-400 mb-2">Charges mensuelles</div>
              <div className="text-2xl font-bold text-red-400">
                {Math.round(property.price * 0.002).toLocaleString()}€
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-semibold text-white mb-4">Points clés</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-lg text-green-500 mb-2">Avantages</h4>
            {[
              "Excellent emplacement",
              "Fort potentiel locatif",
              "Quartier en développement",
              "Bon état général"
            ].map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-300">
                <span className="text-green-500">✓</span>
                {point}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h4 className="text-lg text-yellow-500 mb-2">Points d'attention</h4>
            {[
              "Taxe foncière élevée",
              "Charges de copropriété",
              "Travaux à prévoir dans 5 ans",
              "Zone soumise à encadrement des loyers"
            ].map((point, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-300">
                <span className="text-yellow-500">!</span>
                {point}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}