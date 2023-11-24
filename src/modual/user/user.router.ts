import express from "express";
import { userController } from "./user.controller";
const userRouter = express.Router();

userRouter.post("/", userController.createUser);

userRouter.get("/", userController.getAllUser);
userRouter.get("/:userId", userController.getAUserC);
userRouter.put("/:userId", userController.updateAUserC);
userRouter.delete("/:userId", userController.DeleteAUserC);
userRouter.put("/:userId/orders", userController.SetOrdersC);
userRouter.get("/:userId/orders", userController.getOrdersC);
userRouter.get("/:userId/orders/total-price", userController.getTotalPriceC);

export default userRouter;
