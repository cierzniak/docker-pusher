import { NextFunction, Request, Response } from 'express';
import { ApiError } from './api-error';

export const convertError = (
  err: Error & { statusCode?: number; stack?: string },
  _: Request,
  __: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    next(err);
    return;
  }
  next(new ApiError(err.statusCode ?? 500, err.message ?? 'Internal server error', err.stack));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError = (err: ApiError, _: Request, res: Response, __: NextFunction) => {
  const { statusCode, message } = err;

  res.status(statusCode).send({
    code: statusCode,
    message,
    ...(process.env['NODE_ENV'] !== 'production' && { stack: err.stack }),
  });
};

export { ApiError } from './api-error';
