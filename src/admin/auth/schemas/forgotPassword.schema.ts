import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class ForgotPassword extends mongoose.Document {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  newPasswordToken: string;

}

export const ForgottenPasswordSchema =
  SchemaFactory.createForClass(ForgotPassword);
