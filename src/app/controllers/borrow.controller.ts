import { borrowZodSchema } from "./../zodSchemas/borrow.zodSchema";
import express, { NextFunction, Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();

borrowRoutes.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const borrowData = await borrowZodSchema.parseAsync(req.body);
      console.log("req.body",borrowData.dueDate);
      const targetBook = await Book.findById(borrowData.book);
      console.log(targetBook);
      if (targetBook && Number(targetBook.copies) > 0 && Number(targetBook.copies) >= borrowData.quantity && targetBook.available === true) {
        targetBook.copies = Number(targetBook.copies) - borrowData.quantity;
        await targetBook.save();
        const borrow = await Borrow.create(borrowData);
          await targetBook.updateBookAvailability();
        res.status(201).send({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
      } else {
        res.status(400).send({
          message :"Something went wrong ! please check the book id and availability of book you want to borrow or contact admin for more information!",
          success:false
        })
      }
      
    } catch (error: any) {
      next(error);
    }
  }
);
