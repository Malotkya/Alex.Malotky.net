import express, { Request, Response, NextFunction, Router } from "express";
import createError from "http-errors";
import path from "path";
import ejs from "ejs";

export const Admin: Router = express.Router();

Admin.use(express.static(path.join(__dirname, 'public')));

const createHeader: Function = (contentType: string) => {
    return {
        'WWW-Authenticate': 'Basic realm="AlexMalotky.com"',
        'Content-Type': contentType
    };
};

const username: string = "root";
const password: string = "password";

Admin.use((request: Request, response: Response, next: NextFunction) => {
    let authorization = request.headers.authorization
    let contentType = request.get('Content-Type');

    console.log(contentType);

    if (!authorization) {
        response.set(createHeader('text/html'));
        next(createError(401));
    } else {
        let buffer: Buffer = Buffer.from(authorization.split(" ")[1], 'base64');
        let auth: Array<string> = buffer.toString().split(':');

        if ((auth[0] === username) && (auth[1] === password)) {
            next();
        } else {
            response.set(createHeader('text/html'));
            next(createError(401));
        }
    }
});

Admin.get("/", async (request: Request, response: Response, next: NextFunction) => {
    let render = await ejs.renderFile(path.join(__dirname, "view.ejs"));

    response.send(render);
});
