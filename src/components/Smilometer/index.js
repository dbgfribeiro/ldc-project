import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./smilometer.module.scss";

const Smilometer = ({ emotions, handleCapture }) => {
  const smilePercentage = Math.floor(emotions.happy * 100);
  const neutralScale = emotions.neutral;

  if (smilePercentage === 100 && neutralScale <= 0.001) {
    handleCapture();
  }

  return (
    <div className={styles.smilometer}>
      <CircularProgressbar
        value={smilePercentage}
        minValue={0}
        text={`${smilePercentage}%`}
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
