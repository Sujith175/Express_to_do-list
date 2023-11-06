const express = require("express");
const tasks = require("./Router/tasks");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./DB/connect");
const notFound = require("./Middlewares/notFound");
const errorHandlerMiddleware = require("./Middlewares/errorHandler");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/v1/tasks", tasks);

const port = process.env.PORT || 8000;

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`connected at port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
