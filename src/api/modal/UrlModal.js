import mongoose from "mongoose";
var Schema = mongoose.Schema;

var url = new Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  date: {
    type: String,
    default: Date.now,
  },
});

mongoose.models = {};

var Url = mongoose.model("Url", url);

export default Url;
