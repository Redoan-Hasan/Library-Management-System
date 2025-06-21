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

// 404 handler for unmatched routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
            message:  "Route not found",
            success: false,
            error: {
                message:"Route not found"
            }
        });
});


// global error handler 
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        res.status(400).send({
            message: error.message || "An unexpected error occurred",
            success: false,
            error: error
        })
});

export default app;
