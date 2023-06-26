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
exports.Places = void 0;
const placeModel_1 = require("./placeModel");
const geoCoder_1 = require("./geoCoder");
class Places {
    static createLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address } = req.body;
                const result = yield (0, geoCoder_1.geoNearCode)(address);
                const locationResult = new placeModel_1.placeModel({
                    name: address,
                    location: {
                        type: "Point",
                        coordinates: [result[0].longitude, result[0].latitude],
                    },
                });
                yield locationResult.save();
                return res.send({
                    status: 201,
                    message: "Location added successfully",
                    data: locationResult,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static nearLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { address } = req.params;
                const result = yield (0, geoCoder_1.geoNearCode)(address);
                const pipeline = [
                    {
                        $geoNear: {
                            near: {
                                type: "Point",
                                coordinates: [result[0].longitude, result[0].latitude],
                            },
                            distanceField: "distance",
                            spherical: true,
                        },
                    },
                    {
                        $sort: { distance: 1 },
                    },
                ];
                const locations = yield placeModel_1.placeModel.aggregate(pipeline);
                return res.send({
                    status: 200,
                    data: locations,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.Places = Places;
