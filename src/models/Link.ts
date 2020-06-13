import { Schema, model } from "mongoose";

const schema = new Schema({
  url: { type: String },
  domain: { type: String },
  title: { type: String },
  image: { type: String },
  description: { type: String },
  uid: { type: String, required: true },
  createdAt: { type: Number, default: Date.now() },
});

export const LinkModel = model("Link", schema);
