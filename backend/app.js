const IS_WEBPACK = false;
let OUTDIR = null;
if (IS_WEBPACK)
    OUTDIR = 'build_webpack'
else 
    OUTDIR = 'build'

const express = require("express");
const server = express();
const path = require('path');
const fs = require("fs");
const {createServer} = require("https");

const cors = require('cors');
const corsOptions = { 
    'credentials': true, 
    'origin': true, 
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept'
}
  
  server.use(cors(corsOptions));  // Применяем настройки CORS

const router = require(path.join(__dirname, "js", "routers", "index.js"));
const body_parser = require("body-parser");

const user_checker = require(path.join(__dirname, "js", 'middleware', 'user_checker.js'))
const static_dir = path.join(__dirname, 'static')
server.use('/', express.static(path.join(__dirname, OUTDIR, 'client')))
server.use('/st2', express.static(static_dir));
server.use(express.json());
server.use(body_parser.urlencoded({ extended: true }));

server.use('/api', router);

server.set("view engine", "pug");
server.set("views", path.join(__dirname, "views"));


const https_options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'test.key'), 'utf-8'),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'test.crt'), 'utf-8')
};

//Main routes
server.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, OUTDIR, 'html', 'index.html'));
});


server.get("/user/friends/:id", user_checker, (req, res) => {
    res.sendFile(path.join(__dirname, OUTDIR, 'html', 'user_page_friends.html'));
});

server.get("/user/news/:id", user_checker, (req, res) => {
    res.sendFile(path.join(__dirname, OUTDIR, 'html', 'user_page_news.html'));
});

server.get("/user/redact/:id", user_checker, (req, res) => {
    res.sendFile(path.join(__dirname, OUTDIR, 'html', 'user_page_redact.html'));
});

server.get("*", (req, res) => {
    res.end("No such request!")
});


const SERVER = createServer(https_options, server);

server.listen(3000, () => {
    console.log("Сервер запущен на 3000 порту");
})