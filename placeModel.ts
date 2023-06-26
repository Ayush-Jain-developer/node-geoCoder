import mongoose from "mongoose";

const placesSchema = new mongoose.Schema({
  name: String,
  location: Object,
});

export const placeModel = mongoose.model("places", placesSchema);
