import { NextFunction, Request, Response, Router as ExpressRouter } from 'express';
import { AppInfoController } from './app-info';
import { StatusController } from './status';
import { DockerController } from './docker';

type RouteAction = (req: Request, res: Response, next: NextFunction) => void;

type Router = {
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  action: RouteAction;
  middlewares?: RouteAction[];
};

export type RouterCollection = Router[];

const fillActions = ({ path, method, action, middlewares = [] }: Router) => {
  routes[method](path, ...middlewares, action);
};

export const routes = ExpressRouter();

AppInfoController.forEach(fillActions);
StatusController.forEach(fillActions);
DockerController.forEach(fillActions);
