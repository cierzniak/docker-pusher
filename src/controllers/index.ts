import { NextFunction, Request, Response, Router as ExpressRouter } from 'express';
import { AppInfoController } from './app-info';
import { StatusController } from './status';

type RouteAction = (req: Request, res: Response, next: NextFunction) => void;

type Router = {
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  action: RouteAction;
  middlewares?: RouteAction[];
};

export type RouterCollection = Router[];

export const routes = ExpressRouter();

AppInfoController.forEach(({ path, method, action, middlewares = [] }) => {
  routes[method](path, ...middlewares, action);
});

StatusController.forEach(({ path, method, action, middlewares = [] }) => {
  routes[method](path, ...middlewares, action);
});
