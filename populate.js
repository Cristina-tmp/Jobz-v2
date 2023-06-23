import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import Job from "./models/Job.js";
import connect from "./DB/connect.js";

const start = async () => {
  try {
    await connect(process.env.MONGO_CONNECTION_STRING);
    //await Job.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    );
    await Job.create(jsonProducts);
    console.log("Success!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
