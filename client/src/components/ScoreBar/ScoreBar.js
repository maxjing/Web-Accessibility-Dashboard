import React from "react";
import Circular from "./Circular/Circular";

const ScoreBar = props => {
  return (

    <div style={{ width: "60px" }}>
      <Circular score={props.score} />
    </div>

  );
};
export default ScoreBar;
