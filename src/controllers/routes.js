import express from 'express';
import auth from "./auth/_route.js";
import memory from "./memory/_route.js";
import tag from "./tag/_route.js";

const app = express();

app.use('/auth', auth);
app.use('/memory', memory);
app.use('/tag', tag);

export default app;