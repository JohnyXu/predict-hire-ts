import { Document } from 'mongoose';

declare global {
  interface ICompany extends Document {
    name: string;
    address: string;
  }
}
