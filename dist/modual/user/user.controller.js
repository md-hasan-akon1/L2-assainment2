"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
// //create user
// const createUser = async (req: Request, res: Response) => {
//   try {
//     const data = req.body;
//     // const { error} = userValidateSchema.validate(data);
//     const result = await userServices.createUser(data);
//     //  if(error){
//     //   res.status(201).json({
//     //     success: false,
//     //     massage: "User created failed!",
//     //     data: error.details,
//     //   });
//     //  }
//     res.status(200).json({
//       success: true,
//       massage: "User created successfully!",
//       data: result,
//     });
//   } catch (err: any) {
//     // console.log(err);
//     res.json({
//       success: false,
//       message: err.code == 11000 ? "duplicate data" : "user not created",
//       field: err.keyValue,
//       error: err.code,
//     });
//   }
// };
//create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield user_service_1.userServices.createUser(data);
        res.status(200).json({
            success: true,
            massage: "User created successfully!",
            data: result,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        });
    }
    catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: err.code == 11000 ? "duplicate data" : "user not created",
            error: err.code,
        });
    }
});
//get all user
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUser();
        res.status(200).json({
            success: true,
            massage: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.send(err);
    }
});
const getAUserC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const result = yield user_service_1.userServices.getAUserS(parseInt(id));
    try {
        if (result == null) {
            res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        res.status(200).json({
            success: true,
            massage: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getAUserC,
};
