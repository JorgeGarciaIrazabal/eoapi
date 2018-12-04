var request = require("request");

request("http://localhost:3000/force-refresh", function (error, response, body) {
    console.log(body);
});