import mongoose from 'mongoose';
import Companies from './seeder/company.seeder.js';
import dotenv from 'dotenv';
dotenv.config();

const mongoURL = process.env.MONGO_URI || '';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  Companies,
};

/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () =>
  mongoose.connection.db.dropDatabase();
