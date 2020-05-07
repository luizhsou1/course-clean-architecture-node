import { makeSignUpValidation } from './signup-validation-factory';
import { SignUpController } from '../../../../presentation/controllers/login/signup/signup-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory';
import { makeDbAddAccount } from '../../usecases/add-account/db-add-aaccount-factory';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication());
  return makeLogControllerDecorator(controller);
};