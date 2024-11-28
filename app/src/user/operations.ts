import {
  type UpdateCurrentUser,
  type UpdateUserById,
  type GetPaginatedUsers,
} from 'wasp/server/operations';
import { type User } from 'wasp/entities';
import { HttpError } from 'wasp/server';
import { type SubscriptionStatus } from '../payment/plans';
import { Project } from 'wasp/entities';
import { createProject as createProjectOperation } from 'wasp/server/operations';

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

export const createProject = async ({ name, ...data }: { name: string; [key: string]: any }, context: any) => {
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
};

export const getUserProjects = async (_args: any, context: any) => {
  console.log('========= getUserProjects called =========');
  console.log('Args:', _args);
  console.log('Context:', {
    user: context.user,
    entities: Object.keys(context.entities),
  });
  
  if (!context.user) {
    console.error('❌ No user in context - throwing auth error');
    throw new Error('Not authorized');
  }

  try {
    console.log('🔍 Attempting to fetch projects for user:', context.user.id);
    const projects = await context.entities.Project.findMany({
      where: { userId: context.user.id },
      orderBy: { createdAt: 'desc' },
    });
    
    console.log('✅ Projects found:', projects);
    return projects;
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (
  { projectId }: { projectId: string }, 
  context: { 
    user?: { id: string },
    entities: { Project: any }
  }
) => {
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
};

export const updateProject = async (args: any, context: any) => {
  const { id, ...projectData } = args;
  
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Project.update({
    where: { 
      id: id,
      userId: context.user.id // Ensure user owns the project
    },
    data: projectData
  });
}

export const deleteProject = async (
  { id }: { id: string },
  context: any
) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  try {
    return await context.entities.Project.delete({
      where: { 
        id,
        userId: context.user.id // Ensure user owns the project
      }
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
};

export const activateTrial = async (userId: string, context: any) => {
  const trialStartDate = new Date();
  const trialEndDate = new Date(trialStartDate);
  trialEndDate.setDate(trialEndDate.getDate() + 15);

  return context.entities.User.update({
    where: { id: userId },
    data: {
      hasBankAccount: true,
      trialStartDate,
      trialEndDate,
      subscriptionPlan: 'free',
      subscriptionStatus: 'active'
    }
  });
};