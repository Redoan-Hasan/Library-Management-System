import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send("Welcome to the Library Management System API!");
  } catch (error) {
    next(error);
  }
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if(error){
        res.status(400).send({
            message: error.message || "An unexpected error occurred",
            status: false,
            error: error
        })
    }
});

export default app;
