import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-protocols';
import { resolve } from 'dns';

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}
  async handle(http: HttpRequest): Promise<HttpResponse> {
    await this.validation.validate(http.body);
    return new Promise((resolve) => resolve(null));
  }
}
