import express, { Request, Response, NextFunction, Router, ErrorRequestHandler, RequestHandler } from "express";
import ejs from "ejs";
import path from "path";
import createError from "http-errors";

export const Index: Router = express.Router();

Index.get("/", async (request: Request, response: Response, next: NextFunction) => {
    let render:string = await ejs.renderFile(path.join(__dirname, 'index.ejs'));

    response.send(render);
});

export const FourZeroFour: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    next(createError(404));
};

export const ErrorHandler: ErrorRequestHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
    response.status(error.status || 500);

    ejs.renderFile(path.join(__dirname, 'error.ejs'), {
        message: error.message || "An Error Occured",
        status: error.status || 500,
        stack: process.env.NODE_ENV === "debug" ? error.stack : ""
    }).then( (render: string) => {
        response.send(render);
    })
};