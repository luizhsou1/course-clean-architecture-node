/* eslint-disable @typescript-eslint/no-explicit-any */
import { Validation } from '../../presentation/protocols/validation';
import { InvalidParamError } from '../../presentation/errors';

export class CompareFieldsValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly fieldToCompareName: string) {}

  validate(input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName);
    }
  }
}
