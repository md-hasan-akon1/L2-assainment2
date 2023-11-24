import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt"
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserModel,
} from "./user.interfec";
import config from "../../app/config";
const { Schema } = mongoose;

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, "first name is required"] },
  lastName: { type: String, required: [true, "last name is required"] },
  _id:false
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, "street  is required"] },

  city: { type: String, required: [true, " city is required"] },
  country: { type: String, required: [true, "country is required"] },
  _id:false
});
const OrdersSchema = new Schema<TOrders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  _id:false
});

const UserSchema = new Schema<TUser, UserModel>(
  {
    userId: {
      type: Number,
      unique: true,
      required: [true, "userId is required"],
      validate: {
        validator: Number.isInteger,
        message: "userId must be an integer.",
      },
    },
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
      lowercase: true,
    },
    isActive: { type: Boolean, required: [true, "is active status required"] },
    hobbies: [String],
    address: addressSchema,
    orders: [OrdersSchema],
  },
  { strict: false, timestamps: false }
);
//password hashing
UserSchema.pre('save',async function(next) {

  this.password=await bcrypt.hash(this.password,Number(config.database_url))
  next()
})
//password hashing

// UserSchema.post('save',async function( next) {

//    await User.updateOne(
//     { _id: this.userId },
//     { $unset: { password: 1 } }
//  );
//      next()
// })

 //user checking by statics methods
UserSchema.statics.isUserExists = async function (id: number) {
  const existingUser = await User.findOne({ userId: id });
  return existingUser;
};


export const User = model<TUser, UserModel>("User", UserSchema);
