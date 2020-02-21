const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use("/public", express.static(__dirname + "/public"));
app.use("/data", express.static(__dirname + "/data"));
app.use("/view", express.static(__dirname + "/view"));

app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    extended : true
}));

app.use(express.json({limit: '50mb'}));

app.get("/", (req, res) => {
    res.sendfile("./view/index.htm");
});

app.listen(3001, () => {
    console.log("The Server Has Been Connected! Port Is 3001");
});