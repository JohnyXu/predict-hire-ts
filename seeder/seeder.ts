import dotenv from 'dotenv';

import companies from './data/company.data';
import users from './data/user.data';
import vacancies from './data/vacancy.data';

import Company from '../src/models/Company';
import User from '../src/models/User';
import Vacancy from '../src/models/Vacancy';

import connectMongo from '../src/helper/connect';
dotenv.config();

const importData = async () => {
  try {
    await connectMongo();
    await Company.deleteMany({});
    await User.deleteMany({});
    await Vacancy.deleteMany({});

    await Company.insertMany(companies);
    await User.insertMany(users);
    await Vacancy.insertMany(vacancies);

    console.log('Data imported');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectMongo();
    await Company.deleteMany({});
    await User.deleteMany({});
    await Vacancy.deleteMany({});

    console.log('Data destroyed');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
