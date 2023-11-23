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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const { Schema } = mongoose_1.default;
const fullNameSchema = new Schema({
    firstName: { type: String, required: [true, "first name is required"] },
    lastName: { type: String, required: [true, "last name is required"] },
});
const addressSchema = new Schema({
    street: { type: String, required: [true, "street  is required"] },
    city: { type: String, required: [true, " city is required"] },
    country: { type: String, required: [true, "country is required"] },
});
const OrdersSchema = new Schema([{
        productName: { type: String },
        price: { type: Number },
        quantity: { type: Number },
    }]);
const UserSchema = new Schema({
    userId: { type: Number, unique: true, required: [true, "userId is required"], },
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
        unique: true,
        lowercase: true,
    },
    isActive: { type: Boolean, required: [true, "is active status required"] },
    hobbies: [String],
    address: addressSchema,
    orders: OrdersSchema,
});
// UserSchema.statics.isUserExists = async function (id: number) {
//   const existingUser = await User.findOne({ id });
//   return existingUser;
// };
UserSchema.statics.isUserExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId: id });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
