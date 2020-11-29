import { Schema, model, Model, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  address: string;
}

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Company: Model<ICompany> = model('Company', companySchema);
export default Company;
