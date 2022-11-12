import React from "react";

import styles from "./emotions.module.scss";

const EmotionsReader = ({ emotions }) => {
  return (
    <div className={styles.emotionsTable}>
      {/* ---------------------------------------- */}
      <div className={styles.emotion}>
        <p>Angry</p>
        <div className={styles.meter}>
          <span
            style={
              emotions.angry
                ? { width: emotions.angry * 100 + "%" }
                : { width: 0 }
            }
          ></span>
        </div>
      </div>
      {/* ---------------------------------------- */}
      <div className={styles.emotion}>
        <p>Disgusted</p>
        <div className={styles.meter}>
          <span
            style={
              emotions.disgusted
                ? { width: emotions.disgusted * 100 + "%" }
                : { width: 0 }
            }
          ></span>
        </div>
      </div>
      {/* ---------------------------------------- */}
      <div className={styles.emotion}>
        <p>Fearful</p>
        <div className={styles.meter}>
          <span
            style={
              emotions.fearful
                ? { width: emotions.fearful * 100 + "%" }
                : { width: 0 }
            }
          ></span>
        </div>
      </div>
      {/* ---------------------------------------- */}
      <div className={styles.emotion}>
        <p>Happy</p>
        <div className={styles.meter}>
          <span
            style={
              emotions.happy
                ? { width: emotions.happy * 100 + "%" }
                : { width: 0 }
            }
          ></span>
        </div>
      </div>
      {/* ---------------------------------------- */}
      <div className={styles.emotion}>
        <p>Neutral</p>
        <div className={styles.meter}>
          <span
            style={
              emotions.neutral
                ? { width: emotions.neutral * 100 + "%" }
                : { width: 0 }
            }
          ></span>
        </div>
      </div>
      {/* ---------------------------------------- */}
      <div className={styles.emotion}>
        <p>Sad</p>
        <div className={styles.meter}>
          <span
            style={
              emotions.sad ? { width: emotions.sad * 100 + "%" } : { width: 0 }
            }
          ></span>
        </div>
      </div>
      {/* ---------------------------------------- */}
      <div className={styles.emotion}>
        <p>Surprised</p>
        <div className={styles.meter}>
          <span
            style={
              emotions.surprised
                ? { width: emotions.surprised * 100 + "%" }
                : { width: 0 }
            }
          ></span>
        </div>
      </div>
    </div>
  );
};

export default EmotionsReader;
