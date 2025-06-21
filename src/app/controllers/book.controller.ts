import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { bookZodSchema } from "../zodSchemas/book.zodSchema";

export const bookRoutes = express.Router();

//Create Book
bookRoutes.post("/",async(req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData = await bookZodSchema.parseAsync(req.body);
      console.log("before save",bookData);
      const book = await Book.create(bookData);
      console.log("after save",book);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: {
          book
        },
      });
    } catch (error: any) {
      next(error);
    }
  }
);
