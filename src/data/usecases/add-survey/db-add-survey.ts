import { AddSurvey, AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols';

export class DbAddSurvey implements AddSurvey {
  constructor(private readonly addSurveyRepository: AddSurveyRepository) {}
  async add(suveyData: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(suveyData);
    return new Promise((resolve) => resolve());
  }
}
