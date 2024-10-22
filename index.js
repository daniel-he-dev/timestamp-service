var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/", (req, res) => {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/:date", (req, res) => {
  try {
    const date = new Date(
      !isNaN(Number(req.params.date))
        ? Number(req.params.date)
        : req.params.date
    );
    if (date.toUTCString() === "Invalid Date") throw Error("Invalid Date");
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } catch {
    res.json({ error: "Invalid Date" });
  }
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
