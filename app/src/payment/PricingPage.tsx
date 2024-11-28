import { useAuth } from 'wasp/client/auth';
import { generateCheckoutSession, getCustomerPortalUrl, useQuery } from 'wasp/client/operations';
import { PaymentPlanId, paymentPlans, prettyPaymentPlanName } from './plans';
import { Check, Crown, CreditCard, Users, Zap, Shield, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../client/cn';
import { motion } from "framer-motion";

const bestDealPaymentPlanId: PaymentPlanId = PaymentPlanId.Pro;

// Updated card features with icons
interface PaymentPlanFeature {
  text: string;
  icon: any;
}

interface PaymentPlanCard {
  name: string;
  price: string;
  description: string;
  features: PaymentPlanFeature[];
  color: string;
}

export const paymentPlanCards: Record<PaymentPlanId, PaymentPlanCard> = {
  [PaymentPlanId.Hobby]: {
    name: prettyPaymentPlanName(PaymentPlanId.Hobby),
    price: '€9.99',
    description: 'Parfait pour commencer',
    color: 'from-blue-500/20 to-cyan-500/20',
    features: [
      { text: 'Simulation de prêt basique', icon: CreditCard },
      { text: '3 scénarios par mois', icon: Zap },
      { text: 'Support par email', icon: Shield },
      { text: 'Analyses basiques', icon: Star },
      { text: 'Utilisateur unique', icon: Users }
    ],
  },
  [PaymentPlanId.Pro]: {
    name: prettyPaymentPlanName(PaymentPlanId.Pro),
    price: '€19.99',
    description: 'Le choix des professionnels',
    color: 'from-violet-500/20 to-purple-500/20',
    features: [
      { text: 'Simulation de prêt avancée', icon: CreditCard },
      { text: 'Scénarios illimités', icon: Zap },
      { text: 'Support prioritaire', icon: Shield },
      { text: 'Analyses avancées', icon: Star },
      { text: 'Collaboration en équipe', icon: Users },
      { text: 'Accès API', icon: Shield },
      { text: 'Rapports personnalisés', icon: Star }
    ],
  },
  [PaymentPlanId.Credits10]: {
    name: prettyPaymentPlanName(PaymentPlanId.Credits10),
    price: '€9.99',
    description: 'Achat unique de 10 crédits',
    color: 'from-emerald-500/20 to-teal-500/20',
    features: [
      { text: 'Utilisation pour appels API', icon: CreditCard },
      { text: 'Sans date d\'expiration', icon: Zap },
      { text: 'Support basique', icon: Shield },
      { text: 'Export des données en CSV', icon: Star },
      { text: 'Accès utilisateur unique', icon: Users }
    ],
  },
};

const PricingPage = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  const { data: user } = useAuth();
  const navigate = useNavigate();
  
  const isUserSubscribed = !!user && !!user.subscriptionStatus && user.subscriptionStatus !== 'deleted';

  const { data: customerPortalUrl } = useQuery(getCustomerPortalUrl, { 
    enabled: isUserSubscribed 
  });

  async function handleBuyNowClick(paymentPlanId: PaymentPlanId) {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      setIsPaymentLoading(true);
      const checkoutResults = await generateCheckoutSession(paymentPlanId);
      if (checkoutResults?.sessionUrl) {
        window.open(checkoutResults.sessionUrl, '_self');
      }
    } catch (error) {
      console.error(error);
      setIsPaymentLoading(false);
    }
  }

  return (
    <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center space-y-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400">
                Tarification simple et transparente
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Commencez avec nos options de tarification flexibles. Sans frais cachés.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm rounded-full p-1 px-2">
              <span className="text-gray-400">Carte de test :</span>
              <code className="font-mono text-violet-400">
                4242 4242 4242 4242
              </code>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {Object.values(PaymentPlanId).map((planId, index) => (
            <motion.div
              key={planId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className={cn(
                'group relative rounded-2xl',
                'bg-gray-900/50 backdrop-blur-sm border',
                planId === bestDealPaymentPlanId
                  ? 'border-violet-500/50 shadow-lg shadow-violet-500/20'
                  : 'border-gray-800 hover:border-violet-500/30'
              )}
            >
              {/* Popular Badge */}
              {planId === bestDealPaymentPlanId && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-r from-violet-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg"
                  >
                    <Crown className="h-4 w-4" />
                    Le plus populaire
                  </motion.div>
                </div>
              )}

              <div className="relative p-8 space-y-6">
                {/* Plan Header */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    {paymentPlanCards[planId].name}
                  </h3>
                  <p className="text-gray-400">
                    {paymentPlanCards[planId].description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className={cn(
                    "text-5xl font-bold",
                    planId === bestDealPaymentPlanId
                      ? "bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-400"
                      : "text-white"
                  )}>
                    {paymentPlanCards[planId].price}
                  </span>
                  <span className="text-gray-400">
                    {paymentPlans[planId].effect.kind === 'subscription' && '/month'}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 pt-4">
                  {paymentPlanCards[planId].features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3 text-gray-300">
                      <div className="p-1.5 rounded-lg bg-violet-500/10">
                        <feature.icon className="h-4 w-4 text-violet-400" />
                      </div>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBuyNowClick(planId)}
                  disabled={isPaymentLoading}
                  className={cn(
                    'w-full py-3 px-4 rounded-xl font-medium transition-all duration-300',
                    planId === bestDealPaymentPlanId
                      ? 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-lg shadow-violet-500/25'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700/80',
                    isPaymentLoading && 'opacity-50 cursor-wait'
                  )}
                >
                  {!!user ? 'Get Started' : 'Log in to subscribe'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
