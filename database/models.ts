import { Schema, model, models } from "mongoose";

const searchDataSchema = new Schema({
  id: {type: String, unique: true},
  name: {type: String, required: true},
  location: {type: String, required: true},
})

const SEARCHDATA = models.SEARCHDATA || model("SearchData", searchDataSchema, "SearchData");
export default SEARCHDATA;
