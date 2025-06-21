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

    // if user pass the filter query alone 
    if (filter) {
      books = await Book.find({ genre: String(filter).toUpperCase() }).limit(
        10
      );
    }

    // if user pass the sortBy and sort query alone
    else if (sortBy && sort) {
      books = await Book.find()
        .sort({
          [String(sortBy)]:
            String(sort).toLowerCase() === "asc"
              ? 1
              : String(sort).toLowerCase() === "desc"
              ? -1
              : 1,
        })
        .limit(10);
    }
    // if user pass the limit query alone 
    else if (limit) {
      books = await Book.find().limit(Number(limit));
    } 
    // if user pass the filter, sortBy, sort together 
    else if (filter && sortBy && sort) {
      books = await Book.find({ genre: String(filter).toUpperCase() })
        .sort({
          [String(sortBy)]:
            String(sort).toLowerCase() === "asc"
              ? 1
              : String(sort).toLowerCase() === "desc"
              ? -1
              : 1,
        })
        .limit(10);
    }
    // if user pass the filter, sortBy, sort and limit together 
    else if (filter && sortBy && sort && limit) {
      books = await Book.find({ genre: String(filter).toUpperCase() })
        .sort({
          [String(sortBy)]:
            String(sort).toLowerCase() === "asc"
              ? 1
              : String(sort).toLowerCase() === "desc"
              ? -1
              : 1,
        })
        .limit(Number(limit));
    } 
    if user does not pass any query 
    else {
      books = await Book.find();
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
