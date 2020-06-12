import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class Link extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  domain: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field()
  @CreateDateColumn({ type: "timestamp", default: Date.now() })
  createdAt: Date;
}
