import { HttpRequestInterface, HttpResponseInterface } from './http-interface';

export interface ControllerInterface {
  handle(httpRequest: HttpRequestInterface): HttpResponseInterface;
}
