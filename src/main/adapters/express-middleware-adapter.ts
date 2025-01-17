import { HttpRequest, Middleware } from '../../presentation/protocols';
import { Request, Response, NextFunction } from 'express';

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // retorna algo que o express entende
    const httpRequest: HttpRequest = {
      headers: req.headers,
    };
    const httpResponse = await middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(403).json({ error: httpResponse.body.message });
    }
  };
};
