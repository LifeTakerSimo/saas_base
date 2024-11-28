import { requireNodeEnvVar } from '../server/utils';

export type SubscriptionStatus = 'past_due' | 'cancel_at_period_end' | 'active' | 'deleted';

export enum PaymentPlanId {
  Free = 'free',
  Standard = 'standard',
  Enterprise = 'enterprise'
}

export interface PaymentPlan {
  // Returns the id under which this payment plan is identified on your payment processor. 
  // E.g. this might be price id on Stripe, or variant id on LemonSqueezy.
  getPaymentProcessorPlanId: () => string;
  effect: PaymentPlanEffect;
  id: PaymentPlanId;
  name: string;
}

export type PaymentPlanEffect = 
  | { kind: 'subscription'; maxProjects: number; priceMAD?: number; durationDays?: number }
  | { kind: 'credits'; amount: number };

export const paymentPlans: Record<PaymentPlanId, PaymentPlan> = {
  [PaymentPlanId.Free]: {
    id: PaymentPlanId.Free,
    name: 'Essai Gratuit',
    effect: {
      kind: 'subscription',
      maxProjects: 3,
      durationDays: 15
    },
    getPaymentProcessorPlanId: () => 'free_trial'
  },
  [PaymentPlanId.Standard]: {
    id: PaymentPlanId.Standard,
    name: 'Standard',
    effect: {
      kind: 'subscription',
      maxProjects: 10,
      priceMAD: 100
    },
    getPaymentProcessorPlanId: () => 'price_standard'
  },
  [PaymentPlanId.Enterprise]: {
    id: PaymentPlanId.Enterprise,
    name: 'Entreprise',
    effect: {
      kind: 'subscription',
      maxProjects: -1, // unlimited
      priceMAD: 200
    },
    getPaymentProcessorPlanId: () => 'price_enterprise'
  }
};

export function prettyPaymentPlanName(planId: PaymentPlanId): string {
  const planToName: Record<PaymentPlanId, string> = {
    [PaymentPlanId.Free]: 'Free Trial',
    [PaymentPlanId.Standard]: 'Standard',
    [PaymentPlanId.Enterprise]: 'Enterprise',
  };
  return planToName[planId];
}

export function parsePaymentPlanId(planId: string): PaymentPlanId {
  if ((Object.values(PaymentPlanId) as string[]).includes(planId)) {
    return planId as PaymentPlanId;
  } else {
    throw new Error(`Invalid PaymentPlanId: ${planId}`);
  }
}

export function getSubscriptionPaymentPlanIds(): PaymentPlanId[] {
  return Object.values(PaymentPlanId).filter((planId) => paymentPlans[planId].effect.kind === 'subscription');
}
