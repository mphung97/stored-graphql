import { sign } from "jsonwebtoken";

export const REFRESH_TOKEN_SECRET = "REFRESH_TOKEN_SECRET";
export const ACCESS_TOKEN_SECRET = "ACCESS_TOKEN_SECRET";

export const createTokens = ({ id, sid }: any) => {
  const refreshToken = sign({ uid: id, sid }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7 days",
  });
  const accessToken = sign({ uid: id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15min",
  });

  return { refreshToken, accessToken };
};
