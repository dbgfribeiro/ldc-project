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
                ? { height: emotions.angry * 100 + "%" }
                : { height: 0 }
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
                ? { height: emotions.disgusted * 100 + "%" }
                : { height: 0 }
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
                ? { height: emotions.fearful * 100 + "%" }
                : { height: 0 }
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
                ? { height: emotions.happy * 100 + "%" }
                : { height: 0 }
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
                ? { height: emotions.neutral * 100 + "%" }
                : { height: 0 }
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
              emotions.sad
                ? { height: emotions.sad * 100 + "%" }
                : { height: 0 }
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
                ? { height: emotions.surprised * 100 + "%" }
                : { height: 0 }
            }
          ></span>
        </div>
      </div>
    </div>
  );
};

export default EmotionsReader;
