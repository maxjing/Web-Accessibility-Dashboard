const express = require("express");
const app = express();
const utils = require("./utils/util");
const runLighthouseStaticUrl = utils.runLighthouseStaticUrl;
const fetch = require("node-fetch");
const path = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//for static page tests
app.use("/rdc", (req, res) => {
  let timestamp = req.query.timestamp;
  let type = req.query.type;
  let page = req.query.page;
  runLighthouseStaticUrl(type, page, timestamp, res).catch(e => console.log(e));
});

app.use("/ondemand", (req, res) => {
  let url = req.query.url;
  let cookie = req.query.cookie ? req.query.cookie : "";
  utils
    .runLighthouseOnDemand(url, utils.getTimeStamp(), cookie, res)
    .catch(e => console.log(e));
});

//for trend page use
app.use("/trend", (req, res) => {
  let type = req.query.type;
  let days = req.query.days;
  utils.sendTrendData(type, days, res);
});

function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

//for default detail page
app.use("/reports", (req, res) => {
  const type = req.query.type;
  let timestamp;
  if (req.query.timestamp) {
    timestamp = req.query.timestamp;
  } else {
    timestamp = utils.getMostRecentTimestamp(type);
  }
  Promise.all([
    get(
      `http://localhost:5001/report?type=${type}&page=hp&timestamp=${timestamp}`
    ),
    get(
      `http://localhost:5001/report?type=${type}&page=srp&timestamp=${timestamp}`
    ),
    get(
      `http://localhost:5001/report?type=${type}&page=ldp&timestamp=${timestamp}`
    )
  ])
    .then(([hp, srp, ldp]) =>
      res.json({
        hp: hp,
        srp: srp,
        ldp: ldp
      })
    )
    .catch(err => res.send(err));
});

//single report helper
app.use("/report", (req, res) => {
  let type = req.query.type;
  let page = req.query.page;
  let timestamp = req.query.timestamp;
  const key = `reports/${type}/${page}/${timestamp}.json`;
  utils.getS3File(key, res);
});

//for set config
app
  .route("/config")
  .get(function(req, res) {
    let key = req.query.version
      ? "config/config_default.json"
      : "config/config.json";
    utils.getS3File(key, res);
  })
  .post(function(req, res) {
    utils.uploadConfigFile(req);
  });
app.use("/test", (req, res) => {
  let type = req.query.type;
  let page = req.query.page;
  utils.runLighthouseStaticUrl(type, page, utils.getTimeStamp(), res);
});

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));
