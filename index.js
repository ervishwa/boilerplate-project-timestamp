// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

let responseObj = {};

app.get("/api/:date", (req, res) => {
  let { date } = req.params;

  if (date.includes("-") || date.includes(" ")) {
    /*date in string formate */
    responseObj["unix"] = new Date(date).getTime();
    responseObj["utc"] = new Date(date).toUTCString();
  } else {
    date = parseInt(date);
    responseObj["unix"] = new Date(date).getTime();
    responseObj["utc"] = new Date(date).toUTCString();
  }

  if (!responseObj["unix"] || !responseObj["utc"]) {
    return res.json({
      error: "Invalid Date",
    });
  }

  return res.json(responseObj);
});

app.get("/api/", (req, res) => {
  responseObj["unix"] = new Date().getTime();
  responseObj["utc"] = new Date().toUTCString();
});

// listen for requests :)
//process.env.PORT
var listener = app.listen(5500, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
