import * as bcryptjs from "bcryptjs";
import * as shortid from "shortid";
import {
  Arg,
  createUnionType,
  Ctx,
  Mutation,
  Query,
  Resolver,
  ObjectType,
  Field,
  Int,
} from "type-graphql";
import { User } from "../entity/User";
import { UserInput } from "../types/UserTypes";
// import { createTokens } from "../utils/jwt";

@ObjectType()
class ErrorType {
  @Field(() => Int)
  error: number;

  @Field()
  message: string;

  constructor(error: number, message: string) {
    this.error = error;
    this.message = message;
  }
}

const LoginResultUnion = createUnionType({
  name: "LoginResult",
  types: () => [User, ErrorType],
  // our implementation of detecting returned object type
  resolveType: (value) => {
    if ("error" in value) {
      return ErrorType; // we can return object type class (the one with `@ObjectType()`)
    }
    return User;
  },
});

@Resolver()
export class UserResolver {
  @Query(() => String)
  me() {
    return "me";
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("user", () => UserInput) { username, password }: UserInput
  ) {
    const hash = bcryptjs.hashSync(password, 8);
    const success = await User.create({
      username: username,
      password: hash,
      sid: shortid.generate(),
    }).save();
    if (!success) {
      return false;
    }
    return true;
  }

  @Mutation(() => LoginResultUnion)
  async login(
    @Ctx() { res }: any,
    @Arg("user", () => UserInput) { username, password }: UserInput
  ) {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return new ErrorType(400, "Invalid username or password");
    }

    const valid = await bcryptjs.compare(password, user.password);
    if (!valid) {
      return new ErrorType(400, "Invalid username or password");
    }

    console.log(res);

    // const { accessToken, refreshToken } = createTokens(user);

    // res.cookie("refresh-token", refreshToken);
    // res.cookie("access-token", accessToken);

    return user;
  }

  @Mutation(() => Boolean)
  async logout() {
    return true;
  }
}
