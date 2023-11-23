import mongoose, { model } from "mongoose";
import { TAddress, TFullName, TOrders, TUser, UserModel } from "./user.interfec";
const { Schema } = mongoose;

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, "first name is required"] },
  lastName: { type: String, required: [true, "last name is required"] },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, "street  is required"] },

  city: { type: String, required: [true, " city is required"] },
  country: { type: String, required: [true, "country is required"] },
});
const OrdersSchema = new Schema<TOrders>([{
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
}]);

const UserSchema = new Schema<TUser,UserModel>({
  userId: { type: Number, required: [true, "userId is required"] },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  password: { type: String, required: [true, " password is required"] },
  fullName: fullNameSchema,
  age: { type: Number, required: [true, "Age is required"] },
  email: {
    type: String,
    required: [true, " Email is required"],
    unique: true,
    lowercase: true,
  },
  isActive: { type: Boolean, required: [true, "is active status required"] },
  hobbies: [String],
  address: addressSchema,
  orders: OrdersSchema,
});

// UserSchema.statics.isUserExists = async function (id: number) {
//   const existingUser = await User.findOne({ id });
//   return existingUser;
// };
UserSchema.statics.isUserExists=async function (id:number) {
  const existingUser=await User.findOne({userId:id})
  return existingUser;
}


export const User =model<TUser,UserModel>('User', UserSchema);