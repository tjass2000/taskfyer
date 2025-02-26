const mongoose = require("mongoose");

//This is to handle exceptions in synchronous code
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION!! Shutting down....");
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
const port = process.env.PORT || 3000;

mongoose.connect(db).then(() => {
  console.log("Database connection successful!!");
});

const server = app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});

//This is to handle rejection in asynchronous code
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!! Shutting down....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
