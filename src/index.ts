import path from 'path';
import { config as dotenv } from 'dotenv';
import express, { Express, json } from 'express';
import { routes } from './controllers';
import { convertError, handleError } from './middlewares/error-handler';
import { handleNotFoundRoute } from './middlewares/route-not-found';

dotenv({ path: path.resolve(process.cwd(), '.env.local') });
dotenv({ path: path.resolve(process.cwd(), '.env') });

const app: Express = express();

app.use(json());

app.use(routes);

app.use(handleNotFoundRoute);
app.use(convertError);
app.use(handleError);

app.listen(3000, () => {
  console.log('Docker Webhook is working and listening on http://0.0.0.0:3000');
  console.log(`env: ${process.env['NODE_ENV']}`);
});
