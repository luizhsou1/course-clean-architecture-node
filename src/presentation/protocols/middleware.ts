/* eslint-disable @typescript-eslint/interface-name-prefix */
import { HttpRequest, HttpResponse } from './http';

export interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
