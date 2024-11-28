import {
  type UpdateCurrentUser,
  type UpdateUserById,
  type GetPaginatedUsers,
} from 'wasp/server/operations';
import { type User } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { type SubscriptionStatus } from '../payment/plans';
import { Project } from 'wasp/entities';
import { createAction, createQuery } from 'wasp/client/operations';

export const updateUserById: UpdateUserById<{ id: string; data: Partial<User> }, User> = async (
  { id, data },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  if (!context.user.isAdmin) {
    throw new HttpError(403);
  }

  const updatedUser = await context.entities.User.update({
    where: {
      id,
    },
    data,
  });

  return updatedUser;
};

export const updateCurrentUser = async (args: {
  email?: string;
  username?: string;
  phoneNumber?: string;
  company?: string;
  website?: string;
  address?: string;
  lastActiveTimestamp?: Date;
}, context: any) => {
  if (!context.user) {
    throw new Error('Not authorized');
  }

  return context.entities.User.update({
    where: { id: context.user.id },
    data: args
  });
};

type GetPaginatedUsersInput = {
  skip: number;
  cursor?: number | undefined;
  emailContains?: string;
  isAdmin?: boolean;
  subscriptionStatus?: SubscriptionStatus[];
};
type GetPaginatedUsersOutput = {
  users: Pick<User, 'id' | 'email' | 'username' | 'lastActiveTimestamp' | 'subscriptionStatus' | 'paymentProcessorUserId'>[];
  totalPages: number;
};

export const getPaginatedUsers: GetPaginatedUsers<GetPaginatedUsersInput, GetPaginatedUsersOutput> = async (
  args,
  context
) => {
  if (!context.user?.isAdmin) {
    throw new HttpError(401);
  }

  const allSubscriptionStatusOptions = args.subscriptionStatus as Array<string | null> | undefined;
  const hasNotSubscribed = allSubscriptionStatusOptions?.find((status) => status === null) 
  let subscriptionStatusStrings = allSubscriptionStatusOptions?.filter((status) => status !== null) as string[] | undefined

  const queryResults = await context.entities.User.findMany({
    skip: args.skip,
    take: 10,
    where: {
      AND: [
        {
          email: {
            contains: args.emailContains || undefined,
            mode: 'insensitive',
          },
          isAdmin: args.isAdmin,
        },
        {
          OR: [
            {
              subscriptionStatus: {
                in: subscriptionStatusStrings,
              },
            },
            {
              subscriptionStatus: {
                equals: hasNotSubscribed,
              },
            },
          ],
        },
      ],
    },
    select: {
      id: true,
      email: true,
      username: true,
      isAdmin: true,
      lastActiveTimestamp: true,
      subscriptionStatus: true,
      paymentProcessorUserId: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  const totalUserCount = await context.entities.User.count({
    where: {
      AND: [
        {
          email: {
            contains: args.emailContains || undefined,
            mode: 'insensitive',
          },
          isAdmin: args.isAdmin,
        },
        {
          OR: [
            {
              subscriptionStatus: {
                in: subscriptionStatusStrings,
              },
            },
            {
              subscriptionStatus: {
                equals: hasNotSubscribed,
              },
            },
          ],
        },
      ],
    },
  });
  const totalPages = Math.ceil(totalUserCount / 10);

  return {
    users: queryResults,
    totalPages,
  };
};

export const createProject = createAction<{ name: string }, Project>(async ({ name, ...data }, context) => {
  if (!context.user) {
    throw new Error('Not authorized');
  }

  return context.entities.Project.create({
    data: {
      ...data,
      name,
      userId: context.user.id,
    },
  });
});

export const getUserProjects = createQuery<void, Project[]>(async (_args, context) => {
  if (!context.user) {
    throw new Error('Not authorized');
  }

  return context.entities.Project.findMany({
    where: { userId: context.user.id },
    orderBy: { createdAt: 'desc' },
  });
});

export const getProjectById = createQuery<{ projectId: string }, Project>(async ({ projectId }, context) => {
  if (!context.user) {
    throw new Error('Not authorized');
  }

  const project = await context.entities.Project.findUnique({
    where: { id: projectId },
  });

  if (!project || project.userId !== context.user.id) {
    throw new Error('Project not found or unauthorized');
  }

  return project;
});
