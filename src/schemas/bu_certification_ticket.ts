import { Schema } from "mongoose";
import time;

export var buCertificationTicketSchema: Schema = new Schema({
  pre_certified: Number,
  none: Number,
  name: String,
  in_dashboard: Number,
  auto_certified: Number,
  time: Number
});
buCertificationTicketSchema.pre("save", function(next) {
  if (!this.time) {
    this.time = int(time.time());
  }
  next();
});
