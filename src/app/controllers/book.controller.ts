import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { bookZodSchema } from "../zodSchemas/book.zodSchema";
import { Document } from "mongoose";

export const bookRoutes = express.Router();

//Create Book
bookRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookData = await bookZodSchema.parseAsync(req.body);
      console.log("before save", bookData);
      const book = await Book.create(bookData);
      console.log("after save", book);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: {
          book,
        },
      });
    } catch (error: any) {
      next(error);
    }
  }
);

// Get All Books
bookRoutes.get("", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    let books: Document[] = [];

    if (filter || sortBy || sort || limit) {
      books = await Book.find({ genre: String(filter).toUpperCase() })
        .sort({
          [String(sortBy)]:
            String(sort).toLowerCase() === "asc"
              ? 1
              : String(sort).toLowerCase() === "desc"
              ? -1
              : 1,
        })
        .limit(Number(limit) || 10);
    } else {
      books = await Book.find().limit(10);
    }

    res.status(200).send({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    next(error);
  }
});

//Get Book by ID
