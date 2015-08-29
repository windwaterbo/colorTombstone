var email = require('../resume/email.js');

module.exports.dispatcher = function(req, res) {
    var paramsService = req.params.Service;
    var partService = paramsService.split("_");
    var paramsAction = req.params.Action;
    console.log("paramsService is :: " + paramsService);
    console.log("partService is :: " + partService[0]);
    switch (partService[0]) {
        case "email":
            if (paramsAction) {} else {
                email.callback(paramsService, res, req);
            }
            break;
    }
}
