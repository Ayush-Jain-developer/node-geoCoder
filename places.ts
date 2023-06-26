import { placeModel } from "./placeModel";
import { NextFunction, Request, Response } from "express";
import { geoNearCode } from "./geoCoder";
import { PipelineStage } from "mongoose";

export class Places {
  static async createLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const { address } = req.body;
      const result = await geoNearCode(address);
      const locationResult = new placeModel({
        name: address,
        location: {
          type: "Point",
          coordinates: [result[0].longitude, result[0].latitude],
        },
      });
      await locationResult.save();
      return res.send({
        status: 201,
        message: "Location added successfully",
        data: locationResult,
      });
    } catch (err: any) {
      next(err);
    }
  }

  static async nearLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const { address } = req.params;
      const result = await geoNearCode(address);

      const pipeline: PipelineStage[] = [
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
      const locations = await placeModel.aggregate(pipeline);
      return res.send({
        status: 200,
        data: locations,
      });
    } catch (err: any) {
      next(err);
    }
  }
}
