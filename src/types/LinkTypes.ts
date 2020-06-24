import { Schema } from "mongoose";
import { Field, ID, InputType, ObjectType, Int } from "type-graphql";

@ObjectType()
export class Link {
  @Field(() => ID)
  id: Schema.Types.ObjectId;

  @Field()
  uid: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  domain: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  createdAt: string;
}

@InputType()
export class UpdateLinkInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;
}

@ObjectType()
export class LinksResult {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => [Link], { nullable: true })
  links: Link[];

}
