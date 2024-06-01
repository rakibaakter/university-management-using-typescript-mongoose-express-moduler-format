import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  await mongoose.connect(config.databaseUrl as string);

  try {
    app.listen(config.port, () => {
      console.log(
        `University Management System's listening on port... ${config.port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}
main();
