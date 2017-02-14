var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src/static/'));

app.listen(process.env.PORT || 8080, function () {
    var port = process.env.PORT || 8080;
    console.log("App now running on port", port);
});