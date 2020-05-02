import { HttpResponseInterface } from '../protocols/http-interface';
import { ServerError } from '../errors/server-error';

export const badRequest = (error: Error): HttpResponseInterface => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): HttpResponseInterface => ({
  statusCode: 500,
  body: new ServerError(),
});
