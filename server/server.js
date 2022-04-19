import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();
const port = process.env.PORT ?? 5000;
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(process.env.DB_CONNECT)
  .then(() =>
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  )
  .catch((err) => console.log("err", err));
