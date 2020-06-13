import { Field, InputType, ObjectType } from "type-graphql";
@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ nullable: false })
  sid: string;

  @Field({ nullable: false })
  username: string;
}

@ObjectType()
export class LoginResponse extends User{
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class UserUpdateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;
}
