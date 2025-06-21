import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
      uppercase: true,
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    copies: {
      type: Number,
      min: 0,
      required: true,
      validate: {
        validator: function (value: number) {
          return Number.isInteger(value);
        },
        message: (props) => `Copies must be an integer, got ${props.value}`
      },
    },
    available: { type: Boolean, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Book = model<IBook>("Book", bookSchema);
