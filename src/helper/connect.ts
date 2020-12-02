import mongoose from 'mongoose';

const connectMongo = async (): Promise<typeof mongoose> => {
  const mongoUri =
    process.env.NODE_ENV === 'development'
      ? process.env.MONGO_URI
      : process.env.MONGO_URI_TEST;

  if (!mongoUri) {
    throw new Error("Can't connect Mongo, Wrong MONGO_URI");
  }

  return await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};

export const disconnectDB = (): void => {
  mongoose.disconnect();
};

export default connectMongo;
