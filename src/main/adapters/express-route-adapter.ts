import { Controller, HttpRequest } from '../../presentation/protocols';
import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    // retornar algo que o express entende
    const httpRequest: HttpRequest = {
      body: req.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
