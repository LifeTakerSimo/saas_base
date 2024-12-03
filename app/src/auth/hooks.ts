import { HttpError } from 'wasp/server';
import type { OnAfterSignupHook } from 'wasp/server/auth';

export const onAfterSignup: OnAfterSignupHook = async ({ providerId, user, prisma }) => {
  // Validate Discord users have an email
  if (providerId.providerName === 'discord' && !user.email) {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    throw new HttpError(403, 'Discord user needs a valid email to sign up');
  }

  // Set trial period dates
  const trialStartDate = new Date();
  const trialEndDate = new Date(trialStartDate);
  trialEndDate.setDate(trialStartDate.getDate() + 15); // 15 days trial period

  // Update user with trial dates
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        trialStartDate,
        trialEndDate,
        credits: 3, // Initial credits for new users
      },
    });
  } catch (error) {
    throw new HttpError(500, 'Failed to initialize user trial period');
  }
};
