const app = require("./app");
const mongoose = require("mongoose");
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

app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
