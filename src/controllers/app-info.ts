import { Request, Response } from 'express';
import { RouterCollection } from './index';
import { name, version } from '../../package.json';

const AppInfoAction = (_: Request, res: Response) => {
  res.status(200).json({
    app: name,
    version,
  });
};

export const AppInfoController = [
  {
    path: '/',
    method: 'get',
    action: AppInfoAction,
  },
] as RouterCollection;
