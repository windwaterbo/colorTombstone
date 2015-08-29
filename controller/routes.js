var resume_Service = require('./serviceDispatcher/resume_serviceDispatcher.js');
var url = require('url');
var cors = require('cors');

module.exports = function(app, req) {


    app.route('/resume/:Service/')
        .all(function(req, res, next) {
            console.log('wow~~who r u? I am resume');
            resume_Service.dispatcher(req, res);
        });

}
