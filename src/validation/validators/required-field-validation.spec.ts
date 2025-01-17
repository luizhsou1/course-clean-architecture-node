import { RequiredFieldValidation } from './required-field-validation';
import { MissingParamError } from '../../presentation/errors';

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field');
};

describe('Required Field Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  test('Should not return if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({ field: 'any_field' });
    expect(error).toBeFalsy(); // Garantir que não retorna nada, que não tenha valor
  });
});
