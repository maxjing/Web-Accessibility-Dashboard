const execa = require("execa");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const AWS = require("aws-sdk");
var s3 = new AWS.S3();
const db = require("./db");

//run lighthouse with static urls
async function runLighthouseStaticUrl(type, page, timestamp, res) {
  const url = db.getUrlAndCookie(type, page).url;
  const cookie = db.getUrlAndCookie(type, page).cookie;
  const relativePath = `reports/${type}/${page}/${timestamp}.json`;
  //check if cookie applys
  let extraHeaders = cookie
    ? `--extra-headers '{\"Cookie\":\"${cookie}\"}'`
    : "";
  //for homepage there is a bug, so need different config.js
  let configPath =
    page === "hp"
      ? "./utils/lighthouseHPConfig.js"
      : "./utils/lighthouseConfig.js";
  //run shell command to get lighthouse report
  await execa
    .shell(
      `lighthouse ${url} --quiet --chrome-flags='--no-sandbox --disable-gpu --headless'  ${extraHeaders}  --config-path  ${configPath}  --output json --output-path ./data/${relativePath}`
    )
    .catch(error => {
      console.log(error);
    });
  const filePath = path.join(__dirname, `../data/${relativePath}`);
  const result = require(filePath);
  //send the result to frontend while upload to s3
  res.json({ result });
  let score = Math.round(result.categories.accessibility.score * 100);
  //upload to s3
  uploadFile(filePath, `${relativePath}`, type, page, score, timestamp);
}

//run lighthouse with ondemand url
async function runLighthouseOnDemand(url, timestamp, cookie, res) {
  const page = url.split("//")[1].split("/")[0];
  let extraHeaders = cookie
    ? `--extra-headers '{\"Cookie\":\"${cookie}\"}'`
    : "";
  await execa.shell(
    `lighthouse ${url} --quiet --chrome-flags='--no-sandbox --headless --disable-gpu'  ${extraHeaders}  --config-path './utils/lighthouseConfig.js'  --output json --output-path ./data/reports/ondemand/${page}_${timestamp}.json`
  );
  const result = require(path.join(
    __dirname,
    `../data/reports/ondemand`,
    `${page}_${timestamp}.json`
  ));
  res.json({ result });
}
const reverseArraywithIndex = (arr, size) => {
  let temp = [];
  let result = [];
  arr.reverse().map((item, index) => {
    if (index < size) {
      temp.push(item);
    }
  });
  result = temp.reverse();
  return result;
};

//send trend label and groupdata
async function sendTrendData(type, days, res) {
  const groupdata = readFile(`../data/${type}.json`);
  let labels = reverseArraywithIndex(groupdata.labels, days);
  let data = [];
  let scores_a = reverseArraywithIndex(groupdata.data[0].scores, days);
  let scores_b = reverseArraywithIndex(groupdata.data[1].scores, days);
  let scores_c = reverseArraywithIndex(groupdata.data[2].scores, days);
  data.push(scores_a);
  data.push(scores_b);
  data.push(scores_c);

  res.json({
    id: type,
    labels: labels,
    data: data
  });
}
const readFile = relativepPath => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, relativepPath), "utf-8")
  );
};
const writeFile = (filePath, content) => {
  fs.writeFile(path.join(__dirname, filePath), content, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
};
const uploadFile = (filePath, key, type, page, score, timestamp) => {
  var fileStream = fs.createReadStream(filePath);
  fileStream.on("error", function(err) {
    console.log("File Error", err);
  });

  var params = {
    Bucket: "way-accessibility",
    Key: key,
    Body: fileStream
  };

  s3.upload(params, (err, data) => {
    if (err) console.error(`Upload Error ${err}`);
    else
      fs.unlink(`${filePath}`, err => {
        if (err) console.error(`Delete Error ${err}`);
      });
    //update label
    // execa.shell(
    //   `aws s3 ls way-accessibility/reports/${type}/hp --recursive | sort | tail -n 10 | awk '{ print $4}' >./reports/trendData/label/${type}.txt`
    // );
    db.updateTrendData(type, page, score, timestamp);
  });
};

//set url and cookie at admin page
const uploadConfigFile = req => {
  fs.unlink(path.join(__dirname, `../config.json`), err => {
    if (err) console.error(`Delete Error ${err}`);
  });
  //write body
  db.writeNewFile(`../config.json`, req.body.data);
  //upload config.json to s3
  var fileStream = fs.createReadStream(path.join(__dirname, `../config.json`));
  fileStream.on("error", function(err) {
    console.log("File Error", err);
  });
  var params = {
    Bucket: "way-accessibility",
    Key: "config/config.json",
    Body: fileStream
  };
  s3.upload(params, (err, data) => {
    if (err) console.error(`Upload Error ${err}`);
  });
};

//get the default detail page with newest timestamp
const getMostRecentTimestamp = type => {
  const groupdata = readFile(`../data/${type}.json`);
  return groupdata.labels[59];
};

//read s3file
const getS3File = (key, res) => {
  var params = {
    Bucket: "way-accessibility",
    Key: key
  };

  s3.getObject(params, (err, data) => {
    if (err) console.error(err);
    res.send(JSON.parse(data.Body.toString()));
  });
};

//format timestamp for result
const getTimeStamp = () => {
  let timestamp = new Date();
  let month = timestamp.getMonth() + 1;
  let hour = timestamp.getHours();
  let minute = timestamp.getMinutes();
  let second = timestamp.getSeconds();
  let date = timestamp.getDate();
  month = month < 10 ? "0" + month : "" + month;
  hour = hour < 10 ? "0" + hour : "" + hour;
  minute = minute < 10 ? "0" + minute : "" + minute;
  second = second < 10 ? "0" + second : "" + second;
  date = date < 10 ? "0" + date : "" + date;

  return (
    timestamp.getFullYear() +
    "-" +
    month +
    "-" +
    date +
    "_" +
    hour +
    "-" +
    minute +
    "-" +
    second
  );
};

module.exports = {
  getTimeStamp,
  runLighthouseOnDemand,
  sendTrendData,
  getS3File,
  getMostRecentTimestamp,
  runLighthouseStaticUrl,
  uploadConfigFile
};
