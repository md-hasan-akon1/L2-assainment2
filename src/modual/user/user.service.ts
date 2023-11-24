/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "./user.interfec";
import { User } from "./user.model";

const createUser = async (data: TUser) => {
  const result = await User.create(data);

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
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id }, { password: 0 });
    return result;
  }
  return await User.isUserExists(id);
};

//update a existing user by userID
const updateAUserS = async (id: number, data: any) => {
  try {
    if (await User.isUserExists(id)) {
      const updatedUser = await User.findOneAndUpdate(
        { userId: id },
        { $set: data },
        { new: true }
      );

      if (!updatedUser) {
        return null;
      } else {
        return updatedUser;
      }
    }
    
  } catch (error) {
    return error;
  }

  return await User.isUserExists(id);
};
//Delete A USer
const DeleteAUserS=async(id:number)=>{
if(await User.isUserExists(id)){
console.log("hasan")
const result = await User.deleteOne({ userId: id })
 return result
}
return null;
}

// check order filed and add order
const SetOrdersC=()=>{

}

export const userServices = {
  createUser,
  getAllUser,
  getAUserS,
  updateAUserS,
  DeleteAUserS,
  SetOrdersC
};
