import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URL as string;

export const dbConnection = () => {
  mongoose.connect(url);

  mongoose.connection.on("connected", () => {
    console.log("Successfully connected to database");
  });

  mongoose.connection.on("error", () => {
    console.log("Error while connecting to database");
  });
};
