"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const mongoose_1 = require("./mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, mongoose_1.dbConnection)();
app.use(express_1.default.json());
app.use(router_1.router);
app.get("/", (req, res) => {
    res.send("Hello");
});
app.use((err, req, res, next) => {
    return res.send({
        status: err.status || 500,
        msg: err.message || "Internal Server Error",
    });
});
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
