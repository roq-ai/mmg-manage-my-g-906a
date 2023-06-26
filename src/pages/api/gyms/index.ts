import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { gymValidationSchema } from 'validationSchema/gyms';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getGyms();
    case 'POST':
      return createGym();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGyms() {
    const data = await prisma.gym
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'gym'));
    return res.status(200).json(data);
  }

  async function createGym() {
    await gymValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.Renamedclass?.length > 0) {
      const create_Renamedclass = body.Renamedclass;
      body.Renamedclass = {
        create: create_Renamedclass,
      };
    } else {
      delete body.Renamedclass;
    }
    if (body?.equipment?.length > 0) {
      const create_equipment = body.equipment;
      body.equipment = {
        create: create_equipment,
      };
    } else {
      delete body.equipment;
    }
    if (body?.membership?.length > 0) {
      const create_membership = body.membership;
      body.membership = {
        create: create_membership,
      };
    } else {
      delete body.membership;
    }
    const data = await prisma.gym.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
