import { useState } from 'react';
import type { User } from 'wasp/entities';
import { type SubscriptionStatus, prettyPaymentPlanName, parsePaymentPlanId } from '../payment/plans';
import { getCustomerPortalUrl, useQuery, updateCurrentUser } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';
import { logout } from 'wasp/client/auth';

export default function AccountPage({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user.email || '',
    username: user.username || '',
    'numéro de téléphone': user.phoneNumber || '',
    entreprise: user.company || '',
    adresse: user.address || '',
    'site web': user.website || '',
  });

  const handleSave = async () => {
    try {
      await updateCurrentUser({
        email: formData.email,
        username: formData.username,
        phoneNumber: formData['numéro de téléphone'],
        company: formData.entreprise,
        address: formData.adresse,
        website: formData['site web'],
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  return (
    <div className='mt-10 px-6'>
      <div className='overflow-hidden border border-gray-800 shadow-2xl sm:rounded-2xl mb-4 lg:m-8 bg-gradient-to-b from-black/50 via-gray-900/50 to-black/50 backdrop-blur-sm'>
        <div className='px-4 py-5 sm:px-6 lg:px-8 border-b border-gray-800'>
          <div className='flex justify-between items-center'>
            <h3 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>
              Informations du Compte
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className='px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                       bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                       text-white hover:shadow-lg hover:shadow-purple-500/25'
            >
              {isEditing ? 'Annuler' : 'Modifier le Profil'}
            </button>
          </div>
        </div>

        <div className='px-4 py-5 sm:p-6'>
          <dl className='space-y-6'>
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className='sm:grid sm:grid-cols-3 sm:gap-4'>
                <dt className='text-sm font-medium text-gray-400 capitalize'>{key}</dt>
                <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                  {isEditing ? (
                    <input
                      type='text'
                      value={value}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className='w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg 
                               focus:border-purple-500 focus:ring-purple-500/20 text-white'
                    />
                  ) : (
                    <span className='text-gray-300'>{value || '-'}</span>
                  )}
                </dd>
              </div>
            ))}

            <div className='sm:grid sm:grid-cols-3 sm:gap-4'>
              <dt className='text-sm font-medium text-gray-400'>Abonnement</dt>
              <dd className='mt-1 text-sm sm:col-span-2 sm:mt-0'>
                <UserCurrentPaymentPlan
                  subscriptionStatus={user.subscriptionStatus as SubscriptionStatus}
                  subscriptionPlan={user.subscriptionPlan}
                  datePaid={user.datePaid}
                  credits={user.credits}
                />
              </dd>
            </div>
          </dl>

          {isEditing && (
            <div className='mt-6 flex justify-end gap-3'>
              <button
                onClick={() => setIsEditing(false)}
                className='px-4 py-2 text-sm font-medium rounded-lg border border-gray-700 
                         text-gray-300 hover:bg-gray-800 transition-all duration-300'
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className='px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                         bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 
                         text-white hover:shadow-lg hover:shadow-purple-500/25'
              >
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-end gap-4 px-8'>
        <button
          onClick={logout}
          className='px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300
                   bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 
                   text-white hover:shadow-lg hover:shadow-red-500/25'
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}

type UserCurrentPaymentPlanProps = {
  subscriptionPlan: string | null;
  subscriptionStatus: SubscriptionStatus | null;
  datePaid: Date | null;
  credits: number;
};

function UserCurrentPaymentPlan({ subscriptionPlan, subscriptionStatus, datePaid, credits }: UserCurrentPaymentPlanProps) {
  if (subscriptionStatus && subscriptionPlan && datePaid) {
    return (
      <>
        <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-1 sm:mt-0'>{getUserSubscriptionStatusDescription({ subscriptionPlan, subscriptionStatus, datePaid })}</dd>
        {subscriptionStatus !== 'deleted' ? <CustomerPortalButton /> : <BuyMoreButton />}
      </>
    );
  }

  return (
    <>
      <dd className='mt-1 text-sm text-gray-900 dark:text-gray-400 sm:col-span-1 sm:mt-0'>Credits remaining: {credits}</dd>
      <BuyMoreButton />
    </>
  );
}

function getUserSubscriptionStatusDescription({ subscriptionPlan, subscriptionStatus, datePaid }: { subscriptionPlan: string; subscriptionStatus: SubscriptionStatus; datePaid: Date }) {
  const planName = prettyPaymentPlanName(parsePaymentPlanId(subscriptionPlan));
  const endOfBillingPeriod = prettyPrintEndOfBillingPeriod(datePaid);
  return prettyPrintStatus(planName, subscriptionStatus, endOfBillingPeriod);
}

function prettyPrintStatus(planName: string, subscriptionStatus: SubscriptionStatus, endOfBillingPeriod: string): string {
  const statusToMessage: Record<SubscriptionStatus, string> = {
    active: `${planName}`,
    past_due: `Le paiement de votre abonnement ${planName} est en retard ! Veuillez mettre à jour vos informations de paiement.`,
    cancel_at_period_end: `Votre abonnement ${planName} a été annulé mais reste actif jusqu'à la fin de la période de facturation${endOfBillingPeriod}`,
    deleted: `Votre abonnement précédent a été annulé et n'est plus actif.`,
  };
  if (Object.keys(statusToMessage).includes(subscriptionStatus)) {
    return statusToMessage[subscriptionStatus];
  } else {
    throw new Error(`Statut d'abonnement invalide: ${subscriptionStatus}`);
  }
}

function prettyPrintEndOfBillingPeriod(date: Date) {
  const oneMonthFromNow = new Date(date);
  oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
  return ': ' + oneMonthFromNow.toLocaleDateString();
}

function BuyMoreButton() {
  return (
    <div className='ml-4 flex-shrink-0 sm:col-span-1 sm:mt-0'>
      <Link to='/pricing' className='font-medium text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500'>
        Buy More/Upgrade
      </Link>
    </div>
  );
}

function CustomerPortalButton() {
  const { data: customerPortalUrl, isLoading: isCustomerPortalUrlLoading, error: customerPortalUrlError } = useQuery(getCustomerPortalUrl);

  const handleClick = () => {
    if (customerPortalUrlError) {
      console.error('Error fetching customer portal url');
    }

    if (customerPortalUrl) {
      window.open(customerPortalUrl, '_blank');
    } else {
      console.error('Customer portal URL is not available');
    }
  };

  return (
    <div className='ml-4 flex-shrink-0 sm:col-span-1 sm:mt-0'>
      <button onClick={handleClick} disabled={isCustomerPortalUrlLoading} className='font-medium text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300'>
        Manage Subscription
      </button>
    </div>
  );
}