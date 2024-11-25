import {
  features,
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
import { Home, TrendingUp, Calculator, Brain, Coins, Sliders, FileText, ShieldAlert, MessageSquare, Mail, Apple, Crown, Check } from 'lucide-react'
import { LanguageSelector } from './components/LanguageSelector'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./components/ui/table"
import { Input } from "./components/ui/input"
import { cn } from "../client/cn";
import { VortexDemo } from "./components/ui/vortexDemo";
import { EnhancedInput } from "../components/ui/enhanced-input";

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
    <div className="flex flex-col min-h-screen">
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
                  A Loan Simulator
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-blue-500">
                    so good it feels like cheating
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Simulate your loan, rental income, and affordability all in one place.
                  Make informed decisions for your property investment.
                </p>
                <div className="flex items-center justify-center gap-6 mt-8">
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                      text-white font-medium px-8 py-4 text-lg rounded-xl transition-all duration-300 
                      transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 active:scale-95"
                    asChild
                  >
                    <Link to="#simulate">Start Simulation</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-2 border-white/20 text-white hover:bg-white/10 
                      px-8 py-4 text-lg rounded-xl transition-all duration-300"
                    asChild
                  >
                    <Link to="#features">Learn More</Link>
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
                Try Our Simulators
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
                Powerful Features
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Everything you need to make informed financial decisions with confidence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  title: "Advanced Loan Calculator",
                  description: "Calculate monthly payments, interest rates, and amortization schedules with precision",
                  icon: Calculator,
                  gradient: "from-violet-500 to-fuchsia-500"
                },
                {
                  title: "Real Estate Analysis",
                  description: "Evaluate property investments with comprehensive revenue and expense projections",
                  icon: Home,
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  title: "Affordability Insights",
                  description: "Understand exactly how much home you can afford based on your financial profile",
                  icon: Brain,
                  gradient: "from-pink-500 to-rose-500"
                },
                {
                  title: "Investment Tracking",
                  description: "Monitor your real estate portfolio performance with detailed analytics",
                  icon: TrendingUp,
                  gradient: "from-emerald-500 to-teal-500"
                },
                {
                  title: "Smart Recommendations",
                  description: "Get personalized suggestions based on your financial goals and market conditions",
                  icon: Sliders,
                  gradient: "from-amber-500 to-orange-500"
                },
                {
                  title: "Secure Data",
                  description: "Your financial information is protected with enterprise-grade security",
                  icon: ShieldAlert,
                  gradient: "from-cyan-500 to-blue-500"
                }
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative p-8 bg-black border-2 border-gray-800/50 rounded-xl 
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
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
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
                  <h3 className="text-2xl font-bold text-white">Basic</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">$9</span>
                    <span className="ml-2 text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Basic loan simulation",
                      "3 scenarios per month",
                      "Email support",
                      "Basic analytics",
                      "Single user"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gray-800 text-gray-300 hover:bg-gray-700">
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Pro Plan - Featured */}
              <div className="relative p-8 bg-gradient-to-b from-purple-900/50 via-black/50 to-black/50 border-2 border-purple-500 rounded-xl transform hover:scale-105 transition-all duration-500 shadow-xl shadow-purple-500/20">
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Crown className="h-4 w-4" />
                    Popular
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Pro</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">$29</span>
                    <span className="ml-2 text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Advanced loan simulation",
                      "Unlimited scenarios",
                      "Priority support",
                      "Advanced analytics",
                      "Team collaboration",
                      "API access",
                      "Custom reports"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
                    Get Started
                  </Button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="relative p-8 bg-black/50 border-2 border-gray-800 rounded-xl hover:border-purple-500/50 transition-all duration-500">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Enterprise</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-white">$99</span>
                    <span className="ml-2 text-gray-400">/month</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Everything in Pro",
                      "24/7 Phone & Email support",
                      "Custom features",
                      "On-premise deployment",
                      "Dedicated account manager",
                      "SLA guarantees",
                      "Custom integrations"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gray-800 text-gray-300 hover:bg-gray-700">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-32 mb-24">
              <div className="text-center mb-16">
                <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                  Compare Plans
                </h3>
                <p className="text-gray-400 text-lg">
                  Detailed comparison of all features
                </p>
              </div>

              <div className="relative overflow-x-auto shadow-md rounded-lg border-2 border-gray-800 mb-12">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-gray-800 bg-black/50">
                      <TableHead className="w-1/4 py-4 px-6 text-left text-white font-semibold">Features</TableHead>
                      <TableHead className="w-1/4 py-4 px-6 text-left text-white font-semibold">Basic</TableHead>
                      <TableHead className="w-1/4 py-4 px-6 text-left text-white font-semibold">Pro</TableHead>
                      <TableHead className="w-1/4 py-4 px-6 text-left text-white font-semibold">Enterprise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="bg-black/30">
                    {[
                      { 
                        feature: "Loan Simulation", 
                        basic: "✓", 
                        pro: "✓", 
                        enterprise: "✓" 
                      },
                      { 
                        feature: "Scenarios", 
                        basic: "3/month", 
                        pro: "Unlimited", 
                        enterprise: "Unlimited" 
                      },
                      { 
                        feature: "Support", 
                        basic: "Email", 
                        pro: "Priority Email", 
                        enterprise: "24/7 Phone & Email" 
                      },
                      { 
                        feature: "API Access", 
                        basic: "✗", 
                        pro: "", 
                        enterprise: "✓" 
                      },
                      { 
                        feature: "Custom Features", 
                        basic: "✗", 
                        pro: "✗", 
                        enterprise: "✓" 
                      },
                      { 
                        feature: "On-premise Deployment", 
                        basic: "✗", 
                        pro: "✗", 
                        enterprise: "✓" 
                      },
                      { 
                        feature: "Analytics", 
                        basic: "Basic", 
                        pro: "Advanced", 
                        enterprise: "Custom" 
                      },
                      { 
                        feature: "Team Members", 
                        basic: "1", 
                        pro: "Up to 10", 
                        enterprise: "Unlimited" 
                      },
                      { 
                        feature: "Custom Reports", 
                        basic: "✗", 
                        pro: "✓", 
                        enterprise: "✓" 
                      },
                      { 
                        feature: "Data Export", 
                        basic: "CSV", 
                        pro: "CSV, PDF, API", 
                        enterprise: "All Formats" 
                      }
                    ].map((row, index) => (
                      <TableRow 
                        key={index}
                        className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                      >
                        <TableCell className="py-4 px-6 text-white font-medium">{row.feature}</TableCell>
                        <TableCell className="py-4 px-6 text-gray-300">
                          <span className={row.basic === "✓" ? "text-green-500" : row.basic === "✗" ? "text-red-500" : ""}>
                            {row.basic}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-300">
                          <span className={row.pro === "✓" ? "text-green-500" : row.pro === "✗" ? "text-red-500" : ""}>
                            {row.pro}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-gray-300">
                          <span className={row.enterprise === "✓" ? "text-green-500" : row.enterprise === "✗" ? "text-red-500" : ""}>
                            {row.enterprise}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-24 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative p-8 bg-gradient-to-b from-purple-900/30 via-black/50 to-black/50 border-2 border-purple-500 rounded-xl overflow-hidden">
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  {/* Special offer badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white text-sm font-medium mb-4">
                    <span className="animate-pulse mr-2">🔥</span> Limited Time Offer
                  </div>
                  
                  <h2 className="text-4xl font-bold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      Lifetime Access
                    </span>
                  </h2>
                  
                  <div className="flex justify-center items-baseline space-x-2">
                    <span className="text-gray-400 text-lg line-through">€29/month</span>
                    <span className="text-5xl font-bold text-white">€5</span>
                    <span className="text-gray-400 text-xl">/lifetime</span>
                  </div>
                  
                  <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Join now and lock in lifetime access to all Pro features for a one-time payment of just €5
                  </p>
                  
                  {/* Timer */}
                  <div className="text-gray-400 text-sm">
                    Limited offer - Only for the first 100 users
                  </div>
                  
                  {/* Feature list */}
                  <ul className="text-left space-y-3 max-w-md mx-auto mt-6">
                    {[
                      "Lifetime access to all Pro features",
                      "No monthly fees ever",
                      "Free updates for life",
                      "Priority support",
                      "Lock in early adopter benefits"
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
                      Get Lifetime Access Now
                    </Button>
                    
                    <p className="text-gray-500 text-sm mt-4">
                      30-day money-back guarantee • Secure payment
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

