const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
const router = require("./router");
const cors = require("cors");

//DB setup
mongoose.connect("mongodb://localhost:27017/admin");


//App setup
//Logging middleware express framework
app.use(morgan("combined"));
app.use(cors());
//Request json converter middleware express framework
app.use(bodyParser.json({type: "*/*"}));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("sever listening on port", port);
