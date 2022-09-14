import { https } from 'firebase-functions';
import { app } from "../app.js";

//export const app = https.onRequest(app);
exports.app = https.onRequest(app);