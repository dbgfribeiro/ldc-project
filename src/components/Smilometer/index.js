import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import styles from "./smilometer.module.scss";

const Smilometer = ({ smile }) => {
  const percentage = Math.floor(smile * 100);

  if (percentage === 100) {
    alert("Taking photograph...");
  }

  return (
    <div className={styles.smilometer}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          trailColor: "#171717",
          pathColor: "#005fee",
          textColor: "#ebebeb",
          textSize: "14px",
        })}
      />
      <h2>Smilometer</h2>
    </div>
  );
};

export default Smilometer;
