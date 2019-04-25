import React from "react";
import CircularProgressbar from "react-circular-progressbar";

function Circular(props) {
  const handleStyle = score => {
    if (score >= 90) {
      return passStyle;
    } else if (score >= 50 && score < 90) {
      return averageStyle;
    } else if (score < 50) {
      return failStyle;
    }
  };
  return (
    <CircularProgressbar
      percentage={props.score}
      text={props.score}
      styles={handleStyle(props.score)}
    />
  );
}

const passStyle = {
  // Customize the path, i.e. the part that's "complete"
  path: {
    // Tweak path color:
    stroke: "hsl(139, 70%, 30%)",
    // Tweak path to use flat or rounded ends:
    strokeLinecap: "butt",
    // Tweak transition animation:
    transition: "stroke-dashoffset 0.5s ease 0s"
  },
  // Customize the circle behind the path
  trail: {
    // Tweak the trail color:
    stroke: "#d6d6d6"
  },
  // Customize the text
  text: {
    // Tweak text color:
    fill: "hsl(139, 70%, 30%)",
    // Tweak text size:
    fontSize: "30px",
    dominantBaseline: "middle",
    textAnchor: "middle"
  }
};

const failStyle = {
  // Customize the path, i.e. the part that's "complete"
  path: {
    // Tweak path color:
    stroke: "hsl(1, 73%, 45%)",
    // Tweak path to use flat or rounded ends:
    strokeLinecap: "butt",
    // Tweak transition animation:
    transition: "stroke-dashoffset 0.5s ease 0s"
  },
  // Customize the circle behind the path
  trail: {
    // Tweak the trail color:
    stroke: "#d6d6d6"
  },
  // Customize the text
  text: {
    // Tweak text color:
    fill: "hsl(1, 73%, 45%)",
    // Tweak text size:
    fontSize: "30px",
    dominantBaseline: "middle",
    textAnchor: "middle"
  }
};

const averageStyle = {
  // Customize the path, i.e. the part that's "complete"
  path: {
    // Tweak path color:
    stroke: "hsl(31, 100%, 45%)",
    // Tweak path to use flat or rounded ends:
    strokeLinecap: "butt",
    // Tweak transition animation:
    transition: "stroke-dashoffset 0.5s ease 0s"
  },
  // Customize the circle behind the path
  trail: {
    // Tweak the trail color:
    stroke: "#d6d6d6"
  },
  // Customize the text
  text: {
    // Tweak text color:
    fill: "hsl(31, 100%, 45%)",
    // Tweak text size:
    fontSize: "30px",
    dominantBaseline: "middle",
    textAnchor: "middle"
  }
};
export default Circular;
