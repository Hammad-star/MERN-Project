import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const PORT = process.env.PORT;
const mongoConnectionString = env.MONGO_CONNECTION_STRING;

mongoose
  .connect(mongoConnectionString)
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
