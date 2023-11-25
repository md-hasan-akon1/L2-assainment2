/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { userServices } from "./user.service";
import userValidateSchema, { ordersSchema } from "./use.validation";

//create user
const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { error, value } = userValidateSchema.validate(data);
    const result = await userServices.createUser(value);
    if (error) {
      return res.status(201).json({
        success: false,
        massage: "User created failed!",
        data: error.details,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "User created successfully!",
      data: result,
    });
  } catch (err: any) {
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
  // console.error("rrr",err)
  try {
    const result = await userServices.getAllUser();
    return res.status(200).json({
      success: true,
      massage: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
//get A user
const getAUserC = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const result = await userServices.getAUserS(Number(id));
  try {
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
    return res.status(200).json({
      success: true,
      massage: "Users fetched successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
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
    const id = Number(req.params.userId);
    const data = req.body;
    const result = await userServices.updateAUserS(id, data);

    if (result == null) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: err,
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
// Delete A User
const DeleteAUserC = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.userId);
    const result = await userServices.DeleteAUserS(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    } else if (result.deletedCount == 1) {
      return res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: null,
      });
    }
  } catch (err) {
    return res.status(404).json({
      success: false,
      massage: err,
    });
  }
};
// check order filed and add order
const SetOrdersC = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);
    const data = req.body;
    const { value } = ordersSchema.validate(data);
    const result = await userServices.SetOrdersS(id, value);
    if (!result || result.modifiedCount !== 1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//get a specific user orders

const getOrdersC = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);
  const result = await userServices.getOrdersS(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: {
        result,
      },
    });
  }
};

///get total price a specific user orders
const getTotalPriceC = async (req: Request, res: Response) => {
  const id = Number(req.params.userId);
  const result = await userServices.getTotalPriceS(id);
  if (!result) {
    return res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
  return res.status(200).json({
    success: true,
    message: "Total price calculated successfully!",
    data: {
      totalPrice: result,
    },
  });
};
export const userController = {
  createUser,
  getAllUser,
  getAUserC,
  updateAUserC,
  DeleteAUserC,
  SetOrdersC,
  getOrdersC,
  getTotalPriceC,
};
