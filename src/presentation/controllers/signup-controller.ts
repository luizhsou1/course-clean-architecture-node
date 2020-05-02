import { HttpRequestInterface, HttpResponseInterface } from '../protocols/http-interface';
import { badRequest, serverError } from '../helpers/http-helper';
import { ControllerInterface } from '../protocols/controller-interface';
import { EmailValidatorInterface } from '../protocols/email-validator-interface';
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
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return serverError();
    }
  }
}
