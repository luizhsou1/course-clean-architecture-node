/* eslint-disable @typescript-eslint/interface-name-prefix */
import { HttpRequest, HttpResponse } from './http';

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
