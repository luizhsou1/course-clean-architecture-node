import { ValidationComposite } from './validation-composite';
import { MissingParamError } from '../../errors';
import { Validation } from './validation';

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    class Validationstub implements Validation {
      validate(input: any): Error {
        return new MissingParamError('field');
      }
    }
    const validationStub = new Validationstub();
    const sut = new ValidationComposite([validationStub]);
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
