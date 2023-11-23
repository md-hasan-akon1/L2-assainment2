/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "./user.service";

//create user
const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await userServices.createUser(data);
    res.status(200).json({
      success: true,
      massage: "User created successfully!",
      data: result,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    });
  } catch (err: any) {
    console.log(err);
    res.json({
      success: false,
      message: err.code == 11000 ? "duplicate data" : "user not created",
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


export const userController = {
  createUser,
  getAllUser,
  getAUserC,
};
