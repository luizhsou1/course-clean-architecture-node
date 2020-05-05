import { Controller, HttpRequest, HttpResponse, Validation, Authentication } from './login-protocols';
import { ok, badRequest, serverError, unauthorized } from '../../helpers/http/http-helper';
import { MissingParamError, InvalidParamError } from '../../errors';

export class LoginController implements Controller {
  private readonly authentication: Authentication;
  private readonly validation: Validation;
  constructor(authentication: Authentication, validation: Validation) {
    this.authentication = authentication;
    this.validation = validation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { email, password } = httpRequest.body;
      const acessToken = await this.authentication.auth(email, password);
      if (!acessToken) {
        return unauthorized();
      }

      return ok({ acessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
