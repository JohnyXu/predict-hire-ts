import mongoose from 'mongoose';

const { Schema, model } = mongoose;

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

const Company = model('Company', companySchema);
export default Company;
