"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const placesSchema = new mongoose_1.default.Schema({
    name: String,
    location: Object,
});
exports.placeModel = mongoose_1.default.model("places", placesSchema);
