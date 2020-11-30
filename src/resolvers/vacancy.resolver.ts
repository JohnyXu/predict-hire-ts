import { VacancyEntity } from './../interface/vacancy.types';
import { UserInputError } from 'apollo-server-express';
import { isAdminUser, isAuthUser } from '../middleware/protectRoute';
import {
  validCreateVacancy,
  validUpdateVacancy,
} from '../validator/vacancy.validator';
import Vacancy, { IVacancy } from '../models/Vacancy';
import {
  VacancyInputEntity,
  VacancyUpdateError,
} from '../interface/vacancy.types';
import { convertExpiredAt, DateExpired, formatDate } from '../helper/date';
import moment from 'moment';

function convertExpiredAt2Date(expiredAt: string): string {
  const dateExpired: DateExpired = convertExpiredAt(expiredAt);
  if (dateExpired.count <= 0) {
    throw new UserInputError('Invalid expiredAt format');
  }
  const newExpired: string = formatDate(
    moment().add(dateExpired.count, dateExpired.unit),
  );
  return newExpired;
}

function convertIVacancy2Entity(vacany: IVacancy): VacancyEntity {
  const retVacancy: VacancyEntity = {
    id: vacany.id,
    title: vacany.title,
    description: vacany.description,
    userId: vacany.userId,
    companyId: vacany.companyId,
    expiredAt: formatDate(moment(vacany.expiredAt)),
  };
  return retVacancy;
}

export default {
  Query: {
    getVacancies: isAuthUser(
      async (): Promise<Array<VacancyEntity>> => {
        try {
          const vacancies = await Vacancy.find();
          return vacancies.map(
            (vacancy: IVacancy): VacancyEntity => {
              return convertIVacancy2Entity(vacancy);
            },
          );
        } catch (error) {
          throw new Error(error);
        }
      },
    ),

    getVacancy: isAuthUser(
      async (parent, { id }): Promise<VacancyEntity> => {
        if (!id.trim()) {
          throw new UserInputError('Vacancy id empty');
        }

        try {
          const vacancy = await Vacancy.findById(id);
          if (vacancy) {
            return convertIVacancy2Entity(vacancy);
          }
          throw new Error('Vacancy not found');
        } catch (error) {
          throw new Error(error);
        }
      },
    ),
  },

  Mutation: {
    createVacancy: isAdminUser(
      async (
        parent,
        { vacancy: { title, description, expiredAt } },
        { user },
      ) => {
        const errors: VacancyInputEntity = validCreateVacancy(
          title,
          description,
          expiredAt,
        );
        if (Object.values(errors).length > 0) {
          throw new UserInputError('Error field:', { errors });
        }

        try {
          const newExpired: string = convertExpiredAt2Date(expiredAt);
          const newVacancy = new Vacancy({
            title,
            description,
            expiredAt: newExpired,
            userId: user.id,
            companyId: user.companyId,
          });
          await newVacancy.save();
          return convertIVacancy2Entity(newVacancy);
        } catch (error) {
          throw new Error(error);
        }
      },
    ),
    updateVacancy: isAdminUser(
      async (parent, { id, vacancy: { title, description, expiredAt } }) => {
        const errors: VacancyUpdateError = validUpdateVacancy(
          id,
          title,
          description,
          expiredAt,
        );
        if (Object.values(errors).length > 0) {
          throw new UserInputError('Error field:', { errors });
        }

        try {
          const updateVacancy = await Vacancy.findById(id);
          if (!updateVacancy) {
            throw new UserInputError('Invalid vacancy id');
          }
          if (title) {
            updateVacancy.title = title;
          }
          if (description) {
            updateVacancy.description = description;
          }
          if (expiredAt) {
            updateVacancy.expiredAt = convertExpiredAt2Date(expiredAt);
          }
          await updateVacancy.save();
          return convertIVacancy2Entity(updateVacancy);
        } catch (error) {
          throw new Error(error);
        }
      },
    ),
    deleteVacancy: isAdminUser(async (parent, { id }) => {
      if (!id.trim()) {
        throw new UserInputError('Vacancy id empty');
      }

      try {
        const deleteVacancy = await Vacancy.findById(id);
        if (!deleteVacancy) {
          throw new UserInputError('vacancy not found');
        }
        await deleteVacancy.remove();
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }),
  },
};
