
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  name: string;

  @Prop()
  price: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Author' })
  author: mongoose.Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
