import { Schema, model, Document } from "mongoose";
import shortid from "shortid";

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String },
  sid: { type: String, default: shortid.generate() },
  role: {
    type: String,
    enum: ["admin", "vip", "member"],
    required: true,
    default: "member",
  },
});

interface UserDocument extends Document {
  username: string;
  password: string;
  sid: string;
  role?: string;
}

export const UserModel = model<UserDocument>("User", schema);
