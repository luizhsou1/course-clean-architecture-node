import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';

//Usando Decorator para não ter que mexer nos meus controllers passando a responsabilidade de logar possiveis erros
export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;
  constructor(controller: Controller) {
    this.controller = controller;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      // log
    }
    return httpResponse;
  }
}
