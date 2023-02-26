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
  const data = req.body as UpdateServiceRequest;
  console.log('DEBUG data', data);
  data.images.forEach((image) => {
    const [service] = services.filter((s) => s.image === image);
    if (service) {
      updateService(service);
      res.status(200).json(service);
      return;
    }
  });
  if (!res.headersSent) {
    res.status(404).json({ message: 'Dumb' });
  }
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
