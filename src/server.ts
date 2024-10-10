import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import {Server} from "http"

let server : Server

async function main() {
  await mongoose.connect(config.databaseUrl as string);

  try {
    server = app.listen(config.port, () => {
      console.log(
        `University Management System's listening on port... ${config.port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}
main();

// handle unhandledRejection
process.on('unhandledRejection', ()=>{
  console.log(`😈 unahandledRejection is detected , shutting down ...`);
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})

// handle uncaughtException
process.on('uncaughtException', ()=>{
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1)
})
console.log(x);
