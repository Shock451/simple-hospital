import path from 'path';
import "dotenv/config";
import "regenerator-runtime/runtime.js";
import express, { json, urlencoded } from "express";
// import bodyParser from 'body-parser';
import cors from "cors";

import indexRouter from "./routes/index";

const { PORT } = process.env;

const app = express()

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


// make the application use cors
app.use(cors());
// use bodyparser to parse json body
app.use(json());

// idk bro
app.use(urlencoded({ extended: false }));

/// for errs
app.use((err, req, res, next) => {
    res.status(500).json({
        err,
        msg: 'Internal server error!',
        status: 500
    });
    next();
})

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));