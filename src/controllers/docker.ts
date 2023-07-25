import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { handleApiKeyAuth } from '../middlewares/api-key-auth';
import { handleDocker } from '../middlewares/check-docker';
import { RouterCollection } from './index';
import { getServices, updateService } from '../utils/docker';

const GetServicesAction = asyncHandler(async (_: Request, res: Response) => {
  res.status(200).json(await getServices());
});

type UpdateServiceRequest = {
  images: string[];
};

const UpdateServiceAction = asyncHandler(async (req: Request, res: Response) => {
  const services = await getServices();
  const result = (req.body as UpdateServiceRequest).images.map((image) =>
    services
      .filter((s) => s.image === image)
      .map((service) => {
        updateService(service);

        return service;
      }),
  );
  res.status(200).json({ message: 'OK', result: result });
});

export const DockerController = [
  {
    path: '/services',
    method: 'get',
    action: GetServicesAction,
    middlewares: [handleApiKeyAuth, handleDocker],
  },
  {
    path: '/services',
    method: 'post',
    action: UpdateServiceAction,
    middlewares: [handleApiKeyAuth, handleDocker],
  },
] as RouterCollection;
