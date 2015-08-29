var async = require('async');
var config = require('../../config/setting.js');
var url = require('url');
var nodemailer = require('nodemailer');

module.exports.callback = function(Service, res, req) {
    var queryString = url.parse(req.url, true).query;
    var count = 0;
    var ReturnResult = new Object();
    var ArrayTemp = [];
    switch (Service) {
        case "email_send":

            var transporter = nodemailer.createTransport({
                service: 'yahoo',
                auth: {
                    user: config.email,
                    pass: config.pwd
                }
            });
            //tipmakadnexjwrtf

            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: config.email, // sender address
                to: config.emailReceiver, // list of receivers
                subject: 'Hello ✔ I want you! : ' + req.body.subject, // Subject line
                text: 'From ' + req.body.address + '\n\n' + req.body.comments + '\n\n' + 'Best regards,' + '\n\n' + req.body.yourname // plaintext body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                if (info.response.split(",")[1] == " completed") {
                    res.status(200).end();
                } else {
                    res.status(404).end();
                }

            });



            break;
    }

}
