"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.create(data);
    const actualUserData = user.toObject({ versionKey: false });
    const { password, orders } = actualUserData, result = __rest(actualUserData, ["password", "orders"]);
    return result;
});
//get all user
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
// get a user by userId
const getAUserS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(id);
    if (existingUser) {
        const result = yield user_model_1.User.findOne({ userId: id }, { userId: 1, username: 1, fullName: 1, age: 1, email: 1, isActive: 1, address: 1 });
        return result;
    }
    return existingUser;
});
//update a existing user by userID
const updateAUserS = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(id);
    try {
        if (existingUser) {
            const updatedUser = yield user_model_1.User.findOneAndUpdate({ userId: id }, { $set: data }, { new: true });
            if (!updatedUser) {
                return null;
            }
            else {
                const actualUserData = updatedUser.toObject({ versionKey: false });
                const { password, orders } = actualUserData, result = __rest(actualUserData, ["password", "orders"]);
                return result;
            }
        }
    }
    catch (error) {
        return error;
    }
    return existingUser;
});
//Delete A USer
const DeleteAUserS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(id);
    if (existingUser) {
        const result = yield user_model_1.User.deleteOne({ userId: id });
        return result;
    }
    return null;
});
// check order filed and add order
const SetOrdersS = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(id);
    if (existingUser) {
        if (yield user_model_1.User.findOne({ orders: { $exists: true }, userId: id })) {
            const result = yield user_model_1.User.updateOne({ orders: { $exists: true }, userId: id }, {
                $push: { orders: data },
            }).select("-_id");
            return result;
        }
        else {
            const withOutOrdersFiled = yield user_model_1.User.updateOne({ userId: id }, { $set: { orders: [data] } });
            return withOutOrdersFiled;
        }
    }
    return null;
});
//get a specific user orders
const getOrdersS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(id);
    if (existingUser) {
        return existingUser === null || existingUser === void 0 ? void 0 : existingUser.orders;
    }
    else {
        return false;
    }
});
//get total price a specific user orders
const getTotalPriceS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(id);
    if (existingUser) {
        const products = existingUser === null || existingUser === void 0 ? void 0 : existingUser.orders;
        const totalPrice = products === null || products === void 0 ? void 0 : products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        return totalPrice;
    }
    else {
        return false;
    }
});
exports.userServices = {
    createUser,
    getAllUser,
    getAUserS,
    updateAUserS,
    DeleteAUserS,
    SetOrdersS,
    getOrdersS,
    getTotalPriceS,
};
