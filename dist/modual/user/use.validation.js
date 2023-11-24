"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const fullNameSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .required()
        .messages({ "any.required": "First name is required" }),
    lastName: joi_1.default.string()
        .required()
        .messages({ "any.required": "Last name is required" }),
});
const addressSchema = joi_1.default.object({
    street: joi_1.default.string()
        .required()
        .messages({ "any.required": "Street is required" }),
    city: joi_1.default.string()
        .required()
        .messages({ "any.required": "City is required" }),
    country: joi_1.default.string()
        .required()
        .messages({ "any.required": "Country is required" }),
});
exports.ordersSchema = joi_1.default.object({
    productName: joi_1.default.string(),
    price: joi_1.default.number(),
    quantity: joi_1.default.number(),
});
const userValidateSchema = joi_1.default.object({
    userId: joi_1.default.number()
        .required()
        .messages({ "any.required": "User ID is required" }),
    username: joi_1.default.string().required().messages({
        "any.required": "Username is required",
        "string.unique": "Username must be unique",
    }),
    password: joi_1.default.string()
        .required()
        .messages({ "any.required": "Password is required" }),
    fullName: fullNameSchema,
    age: joi_1.default.number().required().messages({ "any.required": "Age is required" }),
    email: joi_1.default.string().required().email().lowercase().messages({
        "any.required": "Email is required",
        "string.email": "Invalid email format",
    }),
    isActive: joi_1.default.boolean()
        .required()
        .messages({ "any.required": "Active status is required" }),
    hobbies: joi_1.default.array().items(joi_1.default.string()),
    address: addressSchema,
    orders: joi_1.default.array().optional().items(exports.ordersSchema),
});
exports.default = userValidateSchema;
