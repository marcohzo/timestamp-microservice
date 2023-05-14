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
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  const isValidDate = !isNaN(Date.parse(date));

  if (isValidDate) {
    const now = new Date(date);
    const unixTime = now.getTime();
    const utcTime = now.toUTCString();
    return res.status(200).json({
      unix: unixTime,
      UTC: utcTime,
    });
  } else {
    return res.status(400).json({
      message: "Invalid date format",
    });
  }
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
