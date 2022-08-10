import { Field, ObjectType, ID, HideField } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

export const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

@ObjectType()
export class Login extends mongoose.Document {
  @Field(() => ID)
  id: mongoose.Types.ObjectId;

  @Field()
  email: string;

  @HideField()
  password: string;
}
