import {
  navigation,
  faqs,
  footerNavigation,
  testimonials
} from './contentSections';
import Header from './components/Header';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { Button } from "./components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import LoanSimulator from './components/LoanSimulator'
import RentRevenueSimulator from './components/RentRevenueSimulator'
import AffordabilitySimulator from './components/AffordabilitySimulator'
import { Home, TrendingUp, Calculator, Mail, Apple, Crown, Check, Users, Briefcase, ChartBar } from 'lucide-react'
import { LanguageSelector } from './components/LanguageSelector'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./components/ui/table"
import { Input } from "./components/ui/input"
import { cn } from "../client/cn";
import { VortexDemo } from "./components/ui/vortexDemo";
import { EnhancedInput } from "../components/ui/enhanced-input";
import { motion } from 'framer-motion';

const features = [
  {
    title: "Analyse Immobilière Avancée",
    description: "Évaluez la rentabilité de vos investissements avec des analyses détaillées du marché et des prévisions de prix",
    icon: Home,
    gradient: "from-violet-500 to-purple-500",
    highlights: ["Analyse par région", "Prévisions sur 10 ans", "Données en temps réel"]
  },
  {
    title: "Simulateur de Prêt Intelligent",
    description: "Calculez vos mensualités et optimisez votre financement avec notre simulateur de prêt immobilier avancé",
    icon: Calculator,
    gradient: "from-blue-500 to-indigo-500",
    highlights: ["Taux personnalisés", "Amortissement détaillé", "Comparaison de prêts"]
  },
  {
    title: "Analyse Démographique",
    description: "Accédez aux données démographiques détaillées par région pour cibler les meilleurs investissements",
    icon: Users,
    gradient: "from-emerald-500 to-teal-500",
    highlights: ["Données par région", "Évolution population", "Tendances locales"]
  },
  {
    title: "Rentabilité Locative",
    description: "Comparez la rentabilité entre location courte et longue durée avec des estimations précises",
    icon: TrendingUp,
    gradient: "from-pink-500 to-rose-500",
    highlights: ["Location saisonnière", "Location longue durée", "Taux d'occupation"]
  },
  {
    title: "Gestion de Portefeuille",
    description: "Suivez et optimisez votre portefeuille immobilier avec des tableaux de bord personnalisés",
    icon: Briefcase,
    gradient: "from-amber-500 to-orange-500",
    highlights: ["Suivi des performances", "Alertes marché", "Export de rapports"]
  },
  {
    title: "Analyse de Marché",
    description: "Accédez aux tendances du marché immobilier marocain avec des données actualisées",
    icon: ChartBar,
    gradient: "from-cyan-500 to-blue-500",
    highlights: ["Prix au m²", "Évolution des prix", "Zones en croissance"]
  }
];

export default function LandingPage() {
  const [accountType, setAccountType] = useState<string>('email')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  return (
    <div className="flex flex-col min-h-screen font-space-grotesk">
      <Header />
      <main className="flex-1">
        <VortexDemo
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={270}
          className="h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="w-full px-4 relative z-20">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
                  Un Simulateur Immobilier
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-blue-500">
                    qui change la donne
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Simulez vos prêts, revenus locatifs et capacité d'achat en un seul endroit.
                  Prenez des décisions éclairées pour vos investissements immobiliers.
                </p>
                <div className="flex items-center justify-center gap-6 mt-8">
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                      text-white font-medium px-8 py-4 text-lg rounded-xl transition-all duration-300 
                      transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
                    asChild
                  >
                    <Link to="#simulate">Commencer la Simulation</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 
                      px-8 py-4 text-lg rounded-xl transition-all duration-300"
                    asChild
                  >
                    <Link to="#features">En Savoir Plus</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </VortexDemo>
        
        <section id="simulate" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black via-gray-800 to-black">
          <div className="max-w-[1400px] w-full mx-auto">
            <div className="flex flex-col items-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Essayez Nos Simulateurs
              </h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <LoanSimulator />
                <RentRevenueSimulator />
                <AffordabilitySimulator />
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-24 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-4 animate-shimmer">
                Fonctionnalités Puissantes
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour prendre des décisions d'investissement éclairées
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-8 bg-black/50 border-2 border-gray-800/50 rounded-xl 
                    hover:border-purple-500/50 transition-all duration-500 
                    hover:transform hover:scale-[1.02] hover:-translate-y-1
                    before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r 
                    before:from-purple-500/0 before:to-pink-500/0 before:transition-colors
                    hover:before:from-purple-500/5 hover:before:to-pink-500/5"
                >
                  <div className="relative z-10">
                    <div 
                      className={`w-14 h-14 mb-8 rounded-xl bg-gradient-to-br ${feature.gradient} p-3
                        group-hover:scale-110 transition-all duration-500 
                        shadow-[0_0_20px_rgba(0,0,0,0.2)]
                        group-hover:shadow-[0_0_25px_rgba(147,51,234,0.3)]`}
                    >
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <h3 
                      className="text-xl font-bold text-white mb-4 
                        group-hover:text-transparent group-hover:bg-clip-text 
                        group-hover:bg-gradient-to-r group-hover:from-purple-400 
                        group-hover:to-pink-400 transition-all duration-300"
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-500 group-hover:text-gray-400">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${feature.gradient}`} />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-24 pb-48 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                Pricing Plans
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Choose the perfect plan for your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
              {/* Basic Plan */}
              <div className="relative p-8 bg-black/50 border-2 border-gray-800 rounded-xl hover:border-purple-500/50 transition-all duration-500">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Découverte</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">Gratuit</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "3 projets immobiliers",
                      "Analyse de base des investissements",
                      "Calcul des mensualités",
                      "Estimation du rendement locatif",
                      "Accès aux données de base du marché",
                      "Export CSV"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                    Commencer Gratuitement
                  </Button>
                </div>
              </div>

              {/* Pro Plan - Featured */}
              <div className="relative p-8 bg-gradient-to-b from-purple-900/50 via-black/50 to-black/50 border-2 border-purple-500 rounded-xl transform hover:scale-105 transition-all duration-500 shadow-xl shadow-purple-500/20">
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Crown className="h-4 w-4" />
                    Recommandé
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Pro</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">29€</span>
                    <span className="ml-2 text-gray-400">/mois</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Projets illimités",
                      "Analyse détaillée des investissements",
                      "Simulation avancée de prêts",
                      "Analyse démographique par région",
                      "Tendances du marché en temps réel",
                      "Prévisions de prix sur 10 ans",
                      "Comparaison location courte/longue durée",
                      "Export multi-formats (CSV, PDF, API)",
                      "Support prioritaire"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
                    Commencer l'essai Pro
                  </Button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="relative p-8 bg-black/50 border-2 border-gray-800 rounded-xl hover:border-purple-500/50 transition-all duration-500">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Entreprise</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">99€</span>
                    <span className="ml-2 text-gray-400">/mois</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Tout le plan Pro",
                      "Accès multi-utilisateurs",
                      "API personnalisée",
                      "Données de marché personnalisées",
                      "Intégration CRM",
                      "Formation dédiée",
                      "Support dédié 24/7",
                      "SLA garanti",
                      "Déploiement sur site possible"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                    Contacter les Ventes
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-24 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-4 px-6 text-left text-white">Fonctionnalité</th>
                    <th className="py-4 px-6 text-center text-white">Découverte</th>
                    <th className="py-4 px-6 text-center text-white">Pro</th>
                    <th className="py-4 px-6 text-center text-white">Entreprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      feature: "Projets", 
                      basic: "3 max", 
                      pro: "Illimités", 
                      enterprise: "Illimités" 
                    },
                    { 
                      feature: "Analyse Démographique", 
                      basic: "Basique", 
                      pro: "Détaillée", 
                      enterprise: "Personnalisée" 
                    },
                    { 
                      feature: "Prévisions de Prix", 
                      basic: "1 an", 
                      pro: "10 ans", 
                      enterprise: "Sur mesure" 
                    },
                    { 
                      feature: "Support", 
                      basic: "Email", 
                      pro: "Prioritaire", 
                      enterprise: "24/7 Dédié" 
                    },
                    { 
                      feature: "Export", 
                      basic: "CSV", 
                      pro: "CSV, PDF, API", 
                      enterprise: "Tous formats" 
                    }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                      <td className="py-4 px-6 text-white font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-gray-300">{row.basic}</td>
                      <td className="py-4 px-6 text-center text-gray-300">{row.pro}</td>
                      <td className="py-4 px-6 text-center text-gray-300">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="w-full py-24 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative p-8 bg-gradient-to-b from-purple-900/20 via-black/50 to-black/50 border-2 border-purple-500/30 rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                
                <div className="relative z-10 text-center space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
                    <span className="animate-pulse mr-2">🔥</span> Offre de Lancement
                  </div>
                  
                  <h2 className="text-4xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      Accès à Vie
                    </span>
                  </h2>
                  
                  <div className="flex justify-center items-baseline space-x-2">
                    <span className="text-gray-400 text-lg line-through">29€/mois</span>
                    <span className="text-5xl font-bold text-white">5€</span>
                    <span className="text-gray-400 text-xl">/à vie</span>
                  </div>
                  
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Rejoignez-nous maintenant et obtenez un accès à vie à toutes les fonctionnalités Pro pour un paiement unique de 5€
                  </p>
                  
                  {/* Timer */}
                  <div className="text-gray-400 text-sm">
                    Offre limitée - Seulement pour les 100 premiers utilisateurs
                  </div>
                  
                  {/* Feature list */}
                  <ul className="text-left space-y-3 max-w-md mx-auto mt-6">
                    {[
                      "Accès à vie à toutes les fonctionnalités Pro",
                      "Plus jamais de frais mensuels",
                      "Mises à jour gratuites à vie",
                      "Support prioritaire",
                      "Avantages early adopter garantis"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <div className="mt-8">
                    <Button 
                      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
                    >
                      Obtenir l'Accès à Vie Maintenant
                    </Button>
                    
                    <p className="text-gray-500 text-sm mt-4">
                      Garantie satisfait ou remboursé 30 jours • Paiement sécurisé
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-24 lg:py-32 relative bg-gradient-to-b from-black via-gray-900 to-black mt-24">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black transform scale-y-150"></div>
          <div className="relative z-10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center space-y-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 inline-block animate-shimmer">
                  Join Our Waitlist
                </h2>
                <p className="text-gray-400 text-lg">
                  Be the first to know when we launch. Subscribe to our waitlist for exclusive updates and early access.
                </p>
                <form className="max-w-md flex flex-col sm:flex-row gap-3 group">
                  <div className="relative flex-grow">
                    <EnhancedInput 
                      type="email" 
                      placeholder="Enter your email" 
                      icon={<Mail className="w-5 h-5" />}
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-sm text-gray-500 max-w-sm ">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

