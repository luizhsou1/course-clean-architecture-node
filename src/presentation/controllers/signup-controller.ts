import {
  HttpRequestInterface,
  HttpResponseInterface,
  ControllerInterface,
  EmailValidatorInterface,
} from '../protocols';
import { badRequest, serverError } from '../helpers/http-helper';
import { MissingParamError, InvalidParamError } from '../errors';

export class SignUpController implements ControllerInterface {
  private readonly emailValidator: EmailValidatorInterface;
  constructor(emailValidator: EmailValidatorInterface) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequestInterface): HttpResponseInterface {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
