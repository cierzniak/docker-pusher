import path from 'path';
import { config as dotenv } from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import { ApiError, errorConverter, errorHandler } from './middlewares/error-handler';
import { apiKeyAuth } from './middlewares/api-key-auth';
import { name, version } from '../package.json';

dotenv({ path: path.resolve(process.cwd(), '.env.local') });
dotenv({ path: path.resolve(process.cwd(), '.env') });

const app: Express = express();

app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.status(200).json({ app: name, version });
});

app.use(apiKeyAuth);

app.use((req: Request, _: Response, next: NextFunction) => {
  next(new ApiError(404, `Page ${req.path} not found`));
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Docker Webhook is working and listening on http://0.0.0.0:3000');
});
