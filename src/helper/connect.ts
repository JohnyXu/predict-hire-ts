import mongoose from 'mongoose';

const connectMongo = async () => {
  const mongoUri = process.env.MONGO_URI || '';
  if (!mongoUri) {
    throw new Error("Can't connect Mongo, Wrong MONGO_URI");
  }

  return await mongoose.connect(mongoUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};
export default connectMongo;
