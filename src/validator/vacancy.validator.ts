import {
  VacancyInputEntity,
  VacancyUpdateError,
} from '../interface/vacancy.types';

export const validCreateVacancy = (
  title: string,
  description: string,
  expiredAt: string,
): VacancyInputEntity => {
  const errors: VacancyInputEntity = {};

  if (title.trim() === '') {
    errors.title = "vacancy title can't be empty";
  }

  if (description.trim() === '') {
    errors.description = "vacancy description can't be empty";
  }

  if (expiredAt.trim() === '') {
    errors.expiredAt = "vacancy expiredAt can't be empty";
  }

  return errors;
};

export const validUpdateVacancy = (
  id: string,
  title: string,
  description: string,
  expiredAt: string,
): VacancyUpdateError => {
  const errors: VacancyUpdateError = {};
  if (id.trim() === '') {
    errors.id = "vacancy id can't be empty";
  }
  if (!(title.trim() || description.trim() || expiredAt.trim())) {
    errors.message = 'one field should be update';
  }

  return errors;
};
