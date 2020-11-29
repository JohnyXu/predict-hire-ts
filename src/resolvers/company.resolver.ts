import Company, { ICompany } from '../models/Company';

export default {
  Query: {
    getCompanies: async (): Promise<Array<ICompany>> => {
      try {
        const companies = await Company.find();
        return companies;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
