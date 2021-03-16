import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import router from './routes';
var path = require('path');

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
// We need to make sure that "assets" dir is being served by node, so we make it available to receive GET requests
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

export default app
