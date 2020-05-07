import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-protocols';
import { badRequest } from '../../../helpers/http/http-helper';

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}
  async handle(http: HttpRequest): Promise<HttpResponse> {
    const error = await this.validation.validate(http.body);
    if (error) {
      return badRequest(error);
    }
    return new Promise((resolve) => resolve(null));
  }
}
