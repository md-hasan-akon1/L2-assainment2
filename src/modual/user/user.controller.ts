/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidateSchema from "./use.validation";


//create user
const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { error } = userValidateSchema.validate(data);
    const result = await userServices.createUser(data);
    if (error) {
      res.status(201).json({
        success: false,
        massage: "User created failed!",
        data: error.details,
      });
    }
    res.status(200).json({
      success: true,
      massage: "User created successfully!",
      data: result,
    });
  } catch (err: any) {
    console.log(err);
    res.json({
      success: false,
      message:
        err.code == 11000
          ? "duplicate data"
          : err.errors
          ? err.errors
          : "user not created",
      field: err.keyValue,
      error: err.code,
    });
  }
};

//get all user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      massage: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
//get A user
const getAUserC = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const result = await userServices.getAUserS(parseInt(id));
  try {
    if (result == null) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
    res.status(200).json({
      success: true,
      massage: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
// update a existing user
const updateAUserC = async (req: Request, res: Response) => {

  try {
    const id = parseInt(req.params.userId);
    const data=req.body
    // const updateDoc = {
    //   $set: {
    //    ...data
    //   },
    // };
    const result = await userServices.updateAUserS(id,data);
    
    if (result == null) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

  res.status(200).json({
    result
  })
  } catch (err) {
    console.log(err);
  }
};

export const userController = {
  createUser,
  getAllUser,
  getAUserC,
  updateAUserC,
};
