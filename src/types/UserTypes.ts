import { Field, InputType, ObjectType } from "type-graphql";
@ObjectType()
export class UserResult {
  @Field()
  id: string;

  @Field({ nullable: false })
  username: string;
}

@InputType()
export class UserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;
}
