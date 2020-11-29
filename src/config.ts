export default {
  app: {
    port: process.env.PORT || '',
    salt: process.env.SALT,
  },
  mongodb: {
    uri: process.env.MONGO_URI || '',
  },
  token: {
    secret: process.env.SECRET || '',
  },
};
