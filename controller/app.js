/**
 * @fileoverview the http server with express configuration
 * @author Macy_Kanug, Chung-Yueh Lien
 */

var config = require('../config/setting.js'); /* make sure OS specific configuration is included first */

var http = require('http');
var https = require('https');
var morgan = require('morgan'); /* HTTP request logger middleware */
var cookieParser = require('cookie-parser'); /* cookie parsing with signatures */
var bodyParser = require('body-parser'); /* body parsing middleware */
var flash = require('connect-flash'); /* flash message middleware for Connect */
var express = require('express'); /* for REST, MVC, and web framework */
var session = require('express-session'); /* session middleware */
var cors = require('cors');/* corss domain middleware */
var header = require('connect-header');/* header middleware */
/**
 * Initialize the configuration of the http server.
 * @param {Object} app the express object.
 * @return {NULL}
 * @export
 */
module.exports.initialize = function(app) {

    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: 'CYLien_MacyKung_KathyHuang_MickyLi_StarHuang',
        resave: false,
        saveUninitialized: true
    }))
    app.set(config.nodeServer.viewsRoot, config.nodeServer.viewsDefault);
    app.use(express.static(config.nodeServer.viewsDefault));
    app.use(cors());
    app.engine('html', require('ejs').renderFile);
    //web template default is ejs, this line can transform ejs to html,it lets html template visible on nodejs
    app.use(flash()); // for flash message in session
    //To set header on responses
    app.use(header({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "x-hacker": "WELCOME THE SECRET BASE."
    }));
}

/* setting header at cross domain */
// function allowCrossDomain(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//         res.send(200);
//     } else {
//         next();
//     }
// };

/**
 * start the http server.
 * @param {Object} app the express object.
 * @param {string} routeFile the routes rule for the server.
 * @return {NULL}
 * @export
 */
module.exports.start = function(app, routeFile, dbConnectFile) {

    require(routeFile)(app);

    http.createServer(app).on('connection', function(socket) {
        socket.setTimeout(config.nodeServer.timeout)
    }).listen(config.nodeServer.httpPort);

    console.log('http on port ' + config.nodeServer.httpPort);
    console.log('https on port ' + config.nodeServer.httpsPort);
}
