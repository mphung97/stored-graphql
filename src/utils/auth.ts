import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, createTokens } from "./jwt";
import { verify } from "jsonwebtoken";
import { UserModel } from "../models/User";

export default async ({ req, res }: any) => {
  const accessToken = req.cookies["access-token"];
  const refreshToken = req.cookies["refresh-token"];
  let isAuth = false;

  if (!refreshToken && !accessToken) {
    return { res, isAuth };
  }

  try {
    const decoded = verify(accessToken, ACCESS_TOKEN_SECRET) as any;
    isAuth = !!decoded;
    return { res, isAuth };
  } catch {}

  if (!refreshToken) {
    return { res, isAuth };
  }

  let data;

  try {
    data = verify(refreshToken, REFRESH_TOKEN_SECRET) as any;
  } catch {
    return { res, isAuth };
  }

  const user = await UserModel.findById(data.uid);
  // token has been invalidated
  if (!user || user.sid !== data.sid) {
    return { res, isAuth };
  }

  const tokens = createTokens(user);

  res.cookie("refresh-token", tokens.refreshToken, { maxAge: 604800000 });
  res.cookie("access-token", tokens.accessToken, { maxAge: 900000 });

  isAuth = true;
  return { res, isAuth };
};
