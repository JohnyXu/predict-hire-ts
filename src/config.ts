export default {
  app: {
    port: process.env.PORT || '',
    salt: process.env.SALT || 10,
  },
  mongodb: {
    uri: process.env.MONGO_URI || '',
  },
  token: {
    secret: process.env.SECRET || '',
  },
};
