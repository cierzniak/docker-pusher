import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error-handler';

export const handleApiKeyAuth = (req: Request, _: Response, next: NextFunction) => {
  const valid = process.env['API_KEY'];
  const key = req.headers['x-api-key'];
  if (key === undefined) {
    throw new ApiError(401, 'No API key');
  }
  if (key !== valid) {
    throw new ApiError(403, 'API key invalid');
  }
  next();
};
