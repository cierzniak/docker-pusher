import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../error-handler';

export const handleNotFoundRoute = (req: Request, _: Response, next: NextFunction) => {
  next(new ApiError(404, `Page ${req.path} not found`));
};
