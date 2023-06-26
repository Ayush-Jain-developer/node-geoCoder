"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = process.env.MONGODB_URL;
const dbConnection = () => {
    mongoose_1.default.connect(url);
    mongoose_1.default.connection.on("connected", () => {
        console.log("Successfully connected to database");
    });
    mongoose_1.default.connection.on("error", () => {
        console.log("Error while connecting to database");
    });
};
exports.dbConnection = dbConnection;
