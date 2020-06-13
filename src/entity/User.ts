import { Field, ID, ObjectType } from "type-graphql";
import { Column, ObjectID, ObjectIdColumn, BaseEntity, Entity } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field({ nullable: false })
  @Column({ nullable: false })
  sid: string;

  @Field({ nullable: false })
  @Column({ nullable: false, unique: true })
  username: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  password: string;
}
