import _ from "lodash";
import requiredAuditsList from "../json/audits.json";

export const _getAuditItems = data => {
  let audits = [];
  let fails = [];
  let passes = [];
  let score;
  let url;
  let time;
  _.map(data.audits, obj => {
    obj.details && obj.details.items && audits.push(obj);
  });
  _.map(audits, audit => {
    audit.details.items.length === 0 ? passes.push(audit) : fails.push(audit);
  });
  _.map(data.categories, item => {
    score = Math.round(item.score * 100);
  });
  url = data.finalUrl;
  time = ("" + new Date(data.fetchTime)).slice(0, 21);
  return [url, time, score, fails, passes];
};

export const _getHPAuditItems = data => {
  let audits = [];
  let fails = [];
  let passes = [];
  let score;
  let url;
  let time;
  url = data.finalUrl;
  time = ("" + new Date(data.fetchTime)).slice(0, 21);
  _.map(data.audits, obj => {
    obj.details &&
      obj.details.items &&
      requiredAuditsList.hasOwnProperty(obj.id) &&
      audits.push(obj);
  });
  _.map(audits, audit => {
    audit.details.items.length === 0 ? passes.push(audit) : fails.push(audit);
  });

  score = Math.round(data.categories.accessibility.score * 100);

  return [url, time, score, fails, passes];
};

export const _getAuditScore = auditItem => {
  if (requiredAuditsList.hasOwnProperty(auditItem)) {
    return requiredAuditsList[auditItem];
  }
};
export const _getScoreColor = score => {
  switch (score) {
    case 0:
      return "";
    case 1:
      return "#fff8e1";
    case 2:
      return "#ffecb3";
    case 3:
      return "#ffe082";
    case 4:
      return "#ffd54f";
    case 5:
      return "#ffca28";
    case 6:
      return "#ffc107";
    case 7:
      return "#ffb300";
    case 8:
      return "#ffa000";
    case 9:
      return "#ff8f00";
    case 10:
      return "#ff6f00";
    default:
      return "";
  }
};

export const getTimeStamp = () => {
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
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const convertLabel = timestamp => {
  const d = new Date(timestamp.split("_")[0]);
  return (
    days[d.getDay()].slice(0, 3) +
    ", " +
    months[d.getMonth()].slice(0, 3) +
    " " +
    d.getUTCDate()
  );
};

export const convertTooltip = timestamp => {
  let h = timestamp.split("_")[1].split("-")[0];
  const ampm = h > 12 ? "PM" : "AM";
  h = h > 12 ? h - 12 : h;
  h = h < 10 ? "0" + h : "" + h;
  const time =
    h +
    ":" +
    timestamp
      .split("_")[1]
      .slice(3)
      .split("-")
      .join(":");
  return convertLabel(timestamp) + " " + time + " " + ampm;
};
