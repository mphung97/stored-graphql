import { Field, InputType } from "type-graphql";

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
