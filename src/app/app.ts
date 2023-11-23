// getting-started.js

import cors from "cors";
import express, { Application, Request, Response } from "express";
import userRouter from "../modual/user/user.router";
const app: Application = express();
app.use(express.json());
app.use(cors());



app.use('/api/users',userRouter)
app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});

export default app;
