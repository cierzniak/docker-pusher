import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { docker } from '../utils/docker';
import { ApiError } from './error-handler';

export const handleDocker = asyncHandler(async (_: Request, __: Response, next: NextFunction) => {
  const ping = await docker
    .ping()
    .then((p) => p.toString() === 'OK')
    .catch(() => false);
  if (!ping) {
    throw new ApiError(521, 'Docker is not running');
  }
  const swarm = await docker
    .swarmInspect()
    .then(() => true)
    .catch(() => false);
  if (!swarm) {
    throw new ApiError(523, 'Docker is not a Swarm manager');
  }
  next();
});
