import express from 'express';
import { userController } from './user.controller';
const userRouter=express.Router()


userRouter.post('/',userController.createUser)

userRouter.get('/',userController.getAllUser)
userRouter.get('/:userId',userController.getAUserC)







export default userRouter