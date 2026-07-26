import { Schema, model } from "mongoose";

const searchDataSchema = new Schema({
  id: {type: String, unique: true},
  name: {type: String, required: true},
  location: {type: String, required: true},
})

const SEARCHDATA = model("SearchData", searchDataSchema, "SearchData");
export default SEARCHDATA;
