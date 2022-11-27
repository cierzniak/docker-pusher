import { Request, Response } from 'express';
import { RouterCollection } from './index';

const StatusAction = (_: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
  });
};

export const StatusController = [
  {
    path: '/status',
    method: 'get',
    action: StatusAction,
  },
] as RouterCollection;
