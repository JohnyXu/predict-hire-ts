import { Schema, model, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  id: string;
  name: string;
  username: string;
  role: string;
  companyId: string;
  password?: string;
  matchPassword?: (password: string) => boolean;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

userSchema.pre<IUser>('save', async function () {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> = model('User', userSchema);
export default User;
