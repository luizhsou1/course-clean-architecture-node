import { HttpResponseInterface } from '../protocols/http-interface';

export const badRequest = (error: Error): HttpResponseInterface => ({
  statusCode: 400,
  body: error,
});
