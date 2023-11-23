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
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(data);
    return result;
});
//get all user
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
const getAUserS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(id)) {
        const result = yield user_model_1.User.findOne({ userId: id }, { password: 0 });
        return result;
    }
    return yield user_model_1.User.isUserExists(id);
});
exports.userServices = {
    createUser,
    getAllUser,
    getAUserS,
};
