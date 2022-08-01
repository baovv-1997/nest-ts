import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  doctor = 'doctor',
  hospital = 'hospital',
  admin = 'admin',
  superAdmin = 'superAdmin',
}

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);