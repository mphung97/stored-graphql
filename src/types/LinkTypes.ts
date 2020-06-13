import { Field, InputType, ObjectType, ID } from "type-graphql";
import {Schema} from "mongoose"

@ObjectType()
export class Link{
  @Field(() => ID)
  id: Schema.Types.ObjectId;

  @Field()
  userId: string;

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
  createdAt: Date;
}

@InputType()
export class LinkInput {
  @Field()
  uid: string;

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
