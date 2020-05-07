/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpRequest {
  body?: any;
  headers?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
