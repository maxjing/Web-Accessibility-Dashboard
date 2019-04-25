const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");

//get url and cookie of static page
const getUrlAndCookie = (type, page) => {
  const adapter = new FileSync(path.join(__dirname, `../config.json`));
  const db = low(adapter);
  return db
    .get(type)
    .get(page)
    .value();
};

//store new test score, wait until all 3 tests done will update
const storeNewScore = (type, page, score) => {
  const adapter = new FileSync(path.join(__dirname, "../data/newScores.json"));
  const db = low(adapter);
  db.set(`${type}.${page}`, score).write();
};

const getNewScore = (type, page) => {
  const adapter = new FileSync(path.join(__dirname, "../data/newScores.json"));
  const db = low(adapter);
  return db
    .get(`${type}`)
    .get(`${page}`)
    .value();
};

//update Trend date after upload to s3
const updateTrendData = (type, page, score, timestamp) => {
  const adapter = new FileSync(path.join(__dirname, `../data/${type}.json`));
  const db = low(adapter);
  let date;

  storeNewScore(type, page, score);

  //only check hp timestamp, hp is the last test, so all tests done
  if (page === "hp") {
    let labels = db.__wrapped__.labels;
    let data = db.__wrapped__.data;
    date = timestamp.slice(0, 10);
    //check if it is the new test for the day, totall 60 items, 59 is the newest one
    if (labels[59].includes(date)) {
      //not the new day test, just update last item
      labels[59] = timestamp;
      data[0].scores[59] = getNewScore(`${type}`, "hp");
      data[1].scores[59] = getNewScore(`${type}`, "srp");
      data[2].scores[59] = getNewScore(`${type}`, "ldp");
    } else {
      //new test of the day
      labels.push(timestamp);
      labels.shift();
      data[0].scores.push(getNewScore(`${type}`, "hp"));
      data[0].scores.shift();
      data[1].scores.push(getNewScore(`${type}`, "srp"));
      data[1].scores.shift();
      data[2].scores.push(getNewScore(`${type}`, "ldp"));
      data[2].scores.shift();
    }
    db.set("labels", labels).write();
    db.get("data")
      .find({ name: "hp" })
      .assign({ scores: data[0].scores })
      .write();
    db.get("data")
      .find({ name: "srp" })
      .assign({ scores: data[1].scores })
      .write();
    db.get("data")
      .find({ name: "ldp" })
      .assign({ scores: data[2].scores })
      .write();
  }
};

//get static url
const getConfigData = filepath => {
  const adapter = new FileSync(path.join(__dirname, filepath));
  const db = low(adapter);
  let data = [];
  let types = ["prod", "beta", "betax"];
  let pages = ["hp", "srp", "ldp"];
  let index = 0;
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < pages.length; j++) {
      data[index++] = db
        .get(types[i])
        .get(pages[j])
        .value();
    }
  }
  return data;
};

const writeNewFile = (filepath, data) => {
  const adapter = new FileSync(path.join(__dirname, filepath));
  const db = low(adapter);
  db.defaults(data).write();
};

module.exports = {
  updateTrendData,
  getUrlAndCookie,
  getConfigData,
  writeNewFile
};
