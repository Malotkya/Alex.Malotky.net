import express, { Request, Response, NextFunction, Router } from "express";
import { Database } from './data/database';
import ejs from "ejs";
import path from "path";

export const Resume: Router = express.Router();

Resume.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let resume = new Database();
        await resume.init();

        let render = await ejs.renderFile(path.join(__dirname, "view.ejs"), {
            school: resume.school,
            jobs: resume.jobs,
            exp: resume.exp
        });

        response.send(render);
    } catch (error: any) {
        next(error);
    }
});