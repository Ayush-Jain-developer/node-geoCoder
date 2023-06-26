import express, { Request, Response, NextFunction } from "express";
import { router } from "./router";
import { dbConnection } from "./mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

dbConnection();

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.send({
    status: err.status || 500,
    msg: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
