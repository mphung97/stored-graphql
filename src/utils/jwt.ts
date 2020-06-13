import { sign } from "jsonwebtoken";
import { User } from "../entity/User";

const REFRESH_TOKEN_SECRET = "REFRESH_TOKEN_SECRET"
const ACCESS_TOKEN_SECRET = "ACCESS_TOKEN_SECRET"

export const createTokens = (user: User) => {
  const refreshToken = sign(
    { userId: user.id, count: user.sid },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d"
    }
  );
  const accessToken = sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15min"
  });

  return { refreshToken, accessToken };
};