import React, { Component } from "react";
import Chart from "chart.js";
import { convertLabel, convertTooltip } from "../../../utils/util";

class TrendGraph extends Component {
  componentDidMount() {
    this.loadChart();
  }

  render() {
    return (
      <div className="graph-container">
        <canvas id="chart" />
      </div>
    );
  }

  loadChart = () => {
    const { groupData } = this.props;
    const scores = groupData.data;
    let labels = [];
    let tooltipsText = [];
    let datasets = [];
    groupData.labels.forEach(label => {
      labels.push(convertLabel(label));
      tooltipsText.push(convertTooltip(label));
    });
    graphStats.map(function(graphStat, i) {
      return datasets.push({
        label: graphStat[0],
        fill: false,
        borderColor: graphStat[1], // The main line color
        pointBorderColor: "white",
        pointBackgroundColor: graphStat[1],
        pointRadius: 5,
        pointHoverRadius: 5,
        pointBorderWidth: 1,
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: graphStat[1],
        data: scores[i]
      });
    });
    var cv = document.getElementById("chart");
    var ctx = cv.getContext("2d");
    const data = {
      labels: labels,
      datasets: datasets
    };

    var options = {
      responsive: true,
      maintainAspectRatio: true,
      tooltips: {
        callbacks: {
          //custome label
          title: function() {
            return "";
          },
          beforeLabel: function(tooltipItem, data) {
            return tooltipsText[tooltipItem.index];
          }
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false
            },
            scaleLabel: {
              display: false
            }
          }
        ],

        xAxes: [
          {
            ticks: {
              display: true,
              autoSkip: false,
              fontSize: 15
            }
          }
        ]
      }
    };

    var chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options
    });

    //use for click to go to detail page
    cv.onclick = function(e) {
      let activePoint = chart.getElementAtEvent(e);
      let timestamp = chart.getElementAtEvent(e)[0]
        ? groupData.labels[activePoint[0]._index]
        : "";
      timestamp &&
        (window.location = `http://localhost:3006/${
          groupData.id
        }?timestamp=${timestamp}`);
    };
  };
}
const graphStats = [
  ["HomePage", "#0074d9"],
  ["SRP", "#FF851C"],
  ["QV", "#2ECC40"]
];

export default TrendGraph;
