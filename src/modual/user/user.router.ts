import express from 'express';
import { userController } from './user.controller';
const userRouter=express.Router()


userRouter.post('/',userController.createUser)

userRouter.get('/',userController.getAllUser)
userRouter.get('/:userId',userController.getAUserC)
userRouter.put('/:userId',userController.updateAUserC)
userRouter.delete('/:userId',userController.DeleteAUserC)
userRouter.put('/:userId/orders',userController.SetOrdersC)







export default userRouter