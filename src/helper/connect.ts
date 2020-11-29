import mongoose from 'mongoose';
import config from '../config';

const connectMongo = async (): Promise<typeof mongoose> => {
  const mongoUri = config.mongodb.uri;
  if (!mongoUri) {
    throw new Error("Can't connect Mongo, Wrong MONGO_URI");
  }

  return await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};
export default connectMongo;
