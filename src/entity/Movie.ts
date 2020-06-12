import { Field, Int, ObjectType, ID } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  title: string;

  @Field(() => Int)
  @Column("int", { default: 60 })
  minutes: number;
}
