import { Schema } from "mongoose";
//import time;

export var buCertificationTicketSchema: Schema = new Schema({
  pre_certified: String,
  none: String,
  name: String,
  in_dashboard: String,
  auto_certified: String,
  time: Number
});
buCertificationTicketSchema.pre("save", function(next) {
  if (!this.time) {
    this.time = 999999;
  }
  next();
});

