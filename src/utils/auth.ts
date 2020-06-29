import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, createTokens } from "./jwt";
import { verify } from "jsonwebtoken";
import { UserModel } from "../models/User";

export default async ({ req, res }: any) => {
  const accessToken = req.cookies["access-token"];
  const refreshToken = req.cookies["refresh-token"];
  let uid = null;

  if (!refreshToken && !accessToken) {
    return { req, res, uid };
  }

  try {
    const decoded = verify(accessToken, ACCESS_TOKEN_SECRET) as any;
    uid = decoded.uid;
    return { req, res, uid };
  } catch {}

  if (!refreshToken) {
    return { req, res, uid };
  }

  let data;

  try {
    data = verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
  } catch {
    return { req, res, uid };
  }

  const user = await UserModel.findById(data.uid);
  // token has been invalidated
  if (!user || user.sid !== data.sid) {
    return { req, res, uid };
  }

  const tokens = createTokens(user);

  res.cookie("refresh-token", tokens.refreshToken, { maxAge: 604800000 });
  res.cookie("access-token", tokens.accessToken, { maxAge: 900000 });

  uid = data.uid;
  return { req, res, uid };
};
