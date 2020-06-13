import { ObjectType, Int, Field } from "type-graphql";

@ObjectType()
export default class ErrorType {
  @Field(() => Int)
  error: number;

  @Field()
  message: string;

  constructor(error: number, message: string) {
    this.error = error;
    this.message = message;
  }
}