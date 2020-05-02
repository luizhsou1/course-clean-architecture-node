/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IHttpRequest, IHttpResponse } from './http-interface';

export interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}
