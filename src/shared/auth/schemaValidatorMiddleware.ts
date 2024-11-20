import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidator = (schema: AnyZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    schema.parse(
        {
        body: req.body,
        params : req.params,
        query : req.query,
        }
    );
    next();
  } catch (error) {
    if(error instanceof ZodError){
        res.status(400).json(
            error.issues.map((issue) => ({message: issue.message}))
        );
    }
    res.status(400).json({ message: "Error desconocido luego de la validacion" });
  }
};
