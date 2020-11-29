import { Seeder } from 'mongoose-data-seed';
import Company from '../src/models/Company';

const data = [
  {
    _id: '5e5df7fc6953acd3dc50fe8f',
    name: 'PredictiveHire',
    address: '15 Newton St',
  },
];

class CompanysSeeder extends Seeder {
  async shouldRun() {
    return Company.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Company.create(data);
  }
}

export default CompanysSeeder;
