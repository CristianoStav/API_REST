import mongoose from 'mongoose';
import SkyUserModel from '../models/user';
import 'dotenv/config';

const connectToDb = async ({ poolSize = 1, databaseUrl = process.env.DATABASE_URL } = {}) => {
  try {
    return mongoose.connect(databaseUrl,
      {
        poolSize,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected');
      });
  } catch (err) {
    console.log(err);
    return err;
  }
};

const clearDb = async () => {
  await SkyUserModel.deleteMany({});
};

export { connectToDb, clearDb };

export default connectToDb;
