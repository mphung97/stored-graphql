/* eslint-disable no-console */
import mongoose from "mongoose";


const MONGO_ID = process.env.MONGO_ID || "";
const MONGO_PASS = process.env.MONGO_PASS || "";
const MONGODB_URL = `mongodb://${MONGO_ID}:${MONGO_PASS}@ds143131.mlab.com:43131/linkbox`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose
  .connect(MONGODB_URL, options)
  .then(() => console.log("MongoDB is connected"))
  .catch((err: any) => console.log("MongoDB connect failed", err));
