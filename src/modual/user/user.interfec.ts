import { Model } from "mongoose";

export type TFullName = {
  firstName: string;
  lastName: string;
  _id:false
};
export type TAddress = {
  street: string;
  city: string;
  country: string;
  _id:false
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
  _id:false
};
export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrders[];
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser>;
}
