import Company from '../models/Company';

export default {
  Query: {
    getCompanies: async (parent, args, ctx) => {
      try {
        const companies = await Company.find();
        return companies;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
