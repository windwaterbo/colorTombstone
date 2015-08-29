/**
 * @fileoverview start the http server
 * @author Macy_Kanug, Chung-Yueh Lien
 */

/* required package declartaions */
var config = require('../config/setting.js'); /* make sure OS specific configuration is included first */
var Server = require('../controller/app.js'); /* the configuration of the server */
var express = require('express'); /* for REST, MVC, and web framework */

/* start the http serve with configuration by express */
var app = express();
Server.initialize(app);
Server.start(app, config.nodeServer.routeFile);
