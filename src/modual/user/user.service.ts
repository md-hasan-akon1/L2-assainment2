/* eslint-disable @typescript-eslint/no-unused-vars */


import { string } from "joi";
import { TOrders, TUser } from "./user.interfec";
import { User } from "./user.model";

const createUser = async (data: TUser) => {
  const user = await User.create(data);
  const actualUserData = user.toObject({ versionKey: false })
  const {password, orders,...result}=actualUserData;
  
  return result;
};

//get all user
const getAllUser = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 }
  );
  return result;
};
// get a user by userId
const getAUserS = async (id: number) => {
  const existingUser = await User.isUserExists(id);
  if (existingUser) {
    const result = await User.findOne({ userId: id }, { userId:1,username:1,fullName:1,age:1,email:1,isActive:1,address:1});
    return result;
  }
  return existingUser;
};

//update a existing user by userID
const updateAUserS = async (id: number, data:TUser) => {
  const existingUser = await User.isUserExists(id);
  try {
    if (existingUser) {
      const updatedUser = await User.findOneAndUpdate(
        { userId: id },
        { $set: data},
        { new: true },
      );

      if (!updatedUser) {
        return null;
      } else {
        const actualUserData = updatedUser.toObject({ versionKey: false })
        const {password, orders,...result}=actualUserData;
        return result;
      }
    }
  } catch (error) {
    return error;
  }

  return existingUser;
};
//Delete A USer
const DeleteAUserS = async (id: number) => {
  const existingUser = await User.isUserExists(id);
  if (existingUser) {
    const result = await User.deleteOne({ userId: id });
    return result;
  }
  return null;
};

// check order filed and add order
const SetOrdersS = async (id: number, data: TOrders) => {
  const existingUser = await User.isUserExists(id);
  if (existingUser) {
    if (await User.findOne({ orders: { $exists: true }, userId: id })) {
      const result = await User.updateOne(
        { orders: { $exists: true }, userId: id },
        {
          $push: { orders: data },
        }
      ).select("-_id");
      return result;
    } else {
      const withOutOrdersFiled = await User.updateOne(
        { userId: id },
        { $set: { orders: [data] } }
      );

      return withOutOrdersFiled;
    }
  }
  return null;
};
//get a specific user orders
const getOrdersS = async (id: number) => {
  const existingUser = await User.isUserExists(id);
  if (existingUser) {
    return existingUser?.orders;
  } else {
    return false;
  }
};

//get total price a specific user orders
const getTotalPriceS = async (id: number) => {
  const existingUser = await User.isUserExists(id);
  if (existingUser) {
    const products = existingUser?.orders;
    const totalPrice = products?.reduce(
      (sum, product) => sum + (product.price * product.quantity),
      0
    );
    return totalPrice
  } else {
    return false;
  }
};
export const userServices = {
  createUser,
  getAllUser,
  getAUserS,
  updateAUserS,
  DeleteAUserS,
  SetOrdersS,
  getOrdersS,
  getTotalPriceS,
};
