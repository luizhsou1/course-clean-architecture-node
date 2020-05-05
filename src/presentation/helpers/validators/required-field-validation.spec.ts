import { RequiredFieldValidation } from './required-field-validation';
import { InvalidParamError, MissingParamError } from '../../errors';

describe('Required Field Validation', () => {
  test('Slhoud return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field');
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('any_field'));
  });
});
