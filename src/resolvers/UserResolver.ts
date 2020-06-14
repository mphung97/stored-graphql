import { UserInputError } from "apollo-server-express";
import * as bcryptjs from "bcryptjs";
import * as shortid from "shortid";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserModel } from "../models/User";
import { User, UserInput } from "../types/UserTypes";
import { createTokens } from "../utils/jwt";

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => String)
  me() {
    return "me";
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("user", () => UserInput) { username, password }: UserInput
  ) {
    const hash = bcryptjs.hashSync(password, 8);
    const success = await UserModel.create({
      username: username,
      password: hash,
      sid: shortid.generate(),
    });
    if (!success) {
      return false;
    }
    return true;
  }

  @Mutation(() => User)
  async login(
    @Ctx() { res }: any,
    @Arg("user", () => UserInput) { username, password }: UserInput
  ) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new UserInputError("Invalid username or password");
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      throw new UserInputError("Invalid username or password");
    }
    const { _id, sid } = user;
    const { accessToken, refreshToken } = createTokens({
      id: _id,
      sid,
    });

    res.cookie("refresh-token", refreshToken);
    res.cookie("access-token", accessToken);

    return {
      id: _id,
      username,
      sid,
    };
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() { uid }: any) {
    if (!uid) {
      return false;
    }
    const query = await UserModel.findByIdAndUpdate(uid, {
      sid: shortid.generate(),
    });

    if (!query) {
      return false;
    }
    return true;
  }
}
