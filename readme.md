# colorTombstone

The colorTombstone is my resume of web. It's base on `node.js`,`angular.js`,`html5`. You can get my **resume.pdf** there and send me a message. 

## DEMO on Raspberry Pi 2. COMING SOON.

## Installation node_modules

```bash
$ npm install -l
```

## Guide

- Config `setting.js` is a setting list that like global variables.
 - You should set your email address and pwd.

```js
module.exports = {
    nodeServer: {
        "viewsRoot": "views",
        "viewsDefault": "../view",
        "timeout": 10000,
        "routeFile": "../controller/routes.js",
        "httpPort": 3200,
        "httpsPort": 3110
    },
    email: "Your_Mail_Address",
    pwd: "password",
    emailReceiver: "email_address_of_receiver"
}
```

- It's a web server base on Express4. How do it run?

```bash
$ cd app
$ node server.js
```
