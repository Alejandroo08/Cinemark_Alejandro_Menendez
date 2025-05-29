import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import {config} from "./config.js";
mongoose.connect(config.db.URI)

const connection = mongoose.connection;

connection.once("open", () =>
{
    console.log("Connected");
}
);

connection.once("disconnected", () =>
  {
    console.log("disconnected");
  }
);

connection.once("error", (error) =>
{
    console.log("error found" + error);
}
);
