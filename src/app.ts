import express, { Application } from "express";
import path from 'path';
import logger from 'morgan';
import helmet from 'helmet';

let app: Application = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV == "debug") {
    app.use(express.static(path.join(process.cwd(), 'public')));
}


//Routes
import { Index, FourZeroFour, ErrorHandler } from "./index/router";
import { Admin } from "./admin/router";

app.use('/', Index);
app.use('/Admin', Admin);

// catch 404 and forward to error handler
app.use(FourZeroFour);
app.use(ErrorHandler);

module.exports = app;