import { Field, InputType } from "type-graphql";

@InputType()
export class LinkInput {
  @Field()
  userId: string;

  @Field()
  url: string;
}

@InputType()
export class LinkUpdateInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;
}
