import { HttpRequestInterface, HttpResponseInterface } from '../protocols/http-interface';
import { badRequest } from '../helpers/http-helper';
import { ControllerInterface } from '../protocols/controller-interface';
import { EmailValidatorInterface } from '../protocols/email-validator-interface';
import { MissingParamError } from '../errors/missing-param-error';
import { InvalidParamError } from '../errors/invalid-param-error';

export class SignUpController implements ControllerInterface {
  private readonly emailValidator: EmailValidatorInterface;
  constructor(emailValidator: EmailValidatorInterface) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequestInterface): HttpResponseInterface {
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
  }
}
