"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userRouter = express_1.default.Router();
userRouter.post("/", user_controller_1.userController.createUser);
userRouter.get("/", user_controller_1.userController.getAllUser);
userRouter.get("/:userId", user_controller_1.userController.getAUserC);
userRouter.put("/:userId", user_controller_1.userController.updateAUserC);
userRouter.delete("/:userId", user_controller_1.userController.DeleteAUserC);
userRouter.put("/:userId/orders", user_controller_1.userController.SetOrdersC);
userRouter.get("/:userId/orders", user_controller_1.userController.getOrdersC);
userRouter.get("/:userId/orders/total-price", user_controller_1.userController.getTotalPriceC);
exports.default = userRouter;
