import { useAuth } from 'wasp/client/auth';
import { generateCheckoutSession, getCustomerPortalUrl, useQuery } from 'wasp/client/operations';
import { PaymentPlanId, paymentPlans, prettyPaymentPlanName } from './plans';
import { Check, Crown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../client/cn';
import { LampContainer } from '../components/LampEffect';
import { motion } from "framer-motion";

const bestDealPaymentPlanId: PaymentPlanId = PaymentPlanId.Pro;

interface PaymentPlanCard {
  name: string;
  price: string;
  description: string;
  features: string[];
}

export const paymentPlanCards: Record<PaymentPlanId, PaymentPlanCard> = {
  [PaymentPlanId.Hobby]: {
    name: prettyPaymentPlanName(PaymentPlanId.Hobby),
    price: '€9.99',
    description: 'Perfect for getting started',
    features: [
      'Basic loan simulation',
      '3 scenarios per month',
      'Email support',
      'Basic analytics',
      'Single user'
    ],
  },
  [PaymentPlanId.Pro]: {
    name: prettyPaymentPlanName(PaymentPlanId.Pro),
    price: '€19.99',
    description: 'Most popular choice for professionals',
    features: [
      'Advanced loan simulation',
      'Unlimited scenarios',
      'Priority support',
      'Advanced analytics',
      'Team collaboration',
      'API access',
      'Custom reports'
    ],
  },
  [PaymentPlanId.Credits10]: {
    name: prettyPaymentPlanName(PaymentPlanId.Credits10),
    price: '€9.99',
    description: 'One-time purchase of 10 credits',
    features: [
      'Use credits for API calls',
      'No expiration date',
      'Basic support',
      'Data export in CSV',
      'Single user access'
    ],
  },
};

const PricingPage = () => {
  const [isPaymentLoading, setIsPaymentLoading] = useState<boolean>(false);
  
  const { data: user } = useAuth();
  const isUserSubscribed = !!user && !!user.subscriptionStatus && user.subscriptionStatus !== 'deleted';

  const {
    data: customerPortalUrl,
    isLoading: isCustomerPortalUrlLoading,
    error: customerPortalUrlError,
  } = useQuery(getCustomerPortalUrl, { enabled: isUserSubscribed });

  const navigate = useNavigate();

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
      } else {
        throw new Error('Error generating checkout session URL');
      }
    } catch (error) {
      console.error(error);
      setIsPaymentLoading(false);
    }
  }

  const handleCustomerPortalClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (customerPortalUrlError) {
      console.error('Error fetching customer portal url');
    }

    if (!customerPortalUrl) {
      throw new Error(`Customer Portal does not exist for user ${user.id}`)
    }

    window.open(customerPortalUrl, '_blank');
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center'>
      <LampContainer>
        <div className="flex flex-col items-center space-y-20 w-full max-w-7xl">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: -200 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-medium tracking-tight text-white md:text-7xl"
          >
            Choose Your Plan
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: -220 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className='text-center text-gray-400 text-lg max-w-2xl mx-auto' 
          >
            Get started with our flexible pricing options. Try it out with test card
            <span className='mx-2 px-3 py-1 bg-gray-800/50 rounded-md text-gray-300 font-mono'>
              4242 4242 4242 4242
            </span>
          </motion.p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4'>
            {Object.values(PaymentPlanId).map((planId, index) => (
              <motion.div
                key={planId}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: -230 }}
                transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                className={cn(
                  'relative p-8 backdrop-blur-sm border-2 rounded-xl transition-all duration-500',
                  planId === bestDealPaymentPlanId
                    ? 'border-purple-500/50 bg-gradient-to-b from-purple-900/20 via-black/20 to-black/20 shadow-xl shadow-purple-500/20'
                    : 'border-gray-800/50 hover:border-purple-500/50 bg-black/20'
                )}
              >
                {planId === bestDealPaymentPlanId && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute -top-5 left-0 right-0 flex justify-center"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Crown className="h-4 w-4" />
                      Most Popular
                    </div>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    {paymentPlanCards[planId].name}
                  </h3>
                  <div className="flex items-baseline">
                    <span className={cn(
                      "text-5xl font-bold",
                      planId === bestDealPaymentPlanId
                        ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
                        : "text-white"
                    )}>
                      {paymentPlanCards[planId].price}
                    </span>
                    <span className="ml-2 text-gray-400">
                      {paymentPlans[planId].effect.kind === 'subscription' && '/month'}
                    </span>
                  </div>

                  <p className="text-gray-300">
                    {paymentPlanCards[planId].description}
                  </p>

                  <ul className="space-y-4">
                    {paymentPlanCards[planId].features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleBuyNowClick(planId)}
                    disabled={isPaymentLoading}
                    className={cn(
                      'w-full py-2 px-3 rounded-lg font-medium transition-all duration-300',
                      planId === bestDealPaymentPlanId
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/25'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm',
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
      </LampContainer>
    </div>
  );
};

export default PricingPage;
