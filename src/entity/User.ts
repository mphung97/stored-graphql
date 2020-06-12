import { Field, ID, ObjectType } from "type-graphql";
import { Column, ObjectID, ObjectIdColumn } from "typeorm";

@ObjectType()
export class User {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field({ nullable: false })
  @Column({ nullable: false, unique: true })
  username: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  password: string;
}
