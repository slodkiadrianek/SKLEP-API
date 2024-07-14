import mongoose from "mongoose";
const { Schema } = mongoose;

const imageSchema = new Schema({
  fileName: String,
  person: String,
});

const imageModel = mongoose.model("imageModel", imageSchema);

export { imageModel };
