"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const use_validation_1 = __importStar(require("./use.validation"));
//create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { error, value } = use_validation_1.default.validate(data);
        const result = yield user_service_1.userServices.createUser(value);
        if (error) {
            return res.status(201).json({
                success: false,
                massage: "User created failed!",
                data: error.details,
            });
        }
        return res.status(200).json({
            success: true,
            massage: "User created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.json({
            success: false,
            message: err.code == 11000
                ? "duplicate data"
                : err.errors
                    ? err.errors
                    : "user not created",
            field: err.keyValue,
            error: err.code,
        });
    }
});
//get all user
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUser();
        return res.status(200).json({
            success: true,
            massage: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.send(err);
    }
});
//get A user
const getAUserC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    const result = yield user_service_1.userServices.getAUserS(Number(id));
    try {
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        return res.status(200).json({
            success: true,
            massage: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// update a existing user
const updateAUserC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.userId);
        const data = req.body;
        const result = yield user_service_1.userServices.updateAUserS(id, data);
        if (result == null) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: err,
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// Delete A User
const DeleteAUserC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.userId);
        const result = yield user_service_1.userServices.DeleteAUserS(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        else if (result.deletedCount == 1) {
            return res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: null,
            });
        }
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            massage: err,
        });
    }
});
// check order filed and add order
const SetOrdersC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.userId);
        const data = req.body;
        const { value } = use_validation_1.ordersSchema.validate(data);
        const result = yield user_service_1.userServices.SetOrdersS(id, value);
        if (!result || result.modifiedCount !== 1) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
        return res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (err) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
//get a specific user orders
const getOrdersC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.userId);
    const result = yield user_service_1.userServices.getOrdersS(id);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
    else {
        return res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: {
                result,
            },
        });
    }
});
///get total price a specific user orders
const getTotalPriceC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.userId);
    const result = yield user_service_1.userServices.getTotalPriceS(id);
    if (!result) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
    return res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: {
            totalPrice: result,
        },
    });
});
exports.userController = {
    createUser,
    getAllUser,
    getAUserC,
    updateAUserC,
    DeleteAUserC,
    SetOrdersC,
    getOrdersC,
    getTotalPriceC,
};
