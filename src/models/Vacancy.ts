import { Schema, model, Model, Document } from 'mongoose';
import moment from 'moment';
import { formatDate } from '../helper/date';

export interface IVacancy extends Document {
  id: string;
  title: string;
  description: string;
  expiredAt: string;
  userId: string;
  companyId: string;
}

const vacancySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expiredAt: {
    type: Date,
    min: formatDate(moment()),
    max: formatDate(moment().add(3, 'months')),
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Vacancy: Model<IVacancy> = model('Vacancy', vacancySchema);

export default Vacancy;
