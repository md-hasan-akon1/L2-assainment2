// getting-started.js

import cors from "cors";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Application, NextFunction, Request, Response } from "express";
import userRouter from "../modual/user/user.router";
const app: Application = express();
app.use(express.json());
app.use(cors());


//  app.use("*",(err:Error, req:Request, res:Response, next:NextFunction) => {
//   console.log(err)
//  if(err){
//   console.log(err)
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   return res.status(404).json({error});
//  }
//   return next(); 
// });
app.use('/api/users',userRouter)
app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
});

export default app;
