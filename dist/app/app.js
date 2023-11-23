"use strict";
// getting-started.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("../modual/user/user.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', user_router_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;
