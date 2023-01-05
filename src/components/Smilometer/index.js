import React from 'react';
import PropTypes from 'prop-types';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './smilometer.module.scss';

const Smilometer = ({ emotions }) => {
  const smilePercentage = Math.floor(emotions.happy * 100);

  return (
    <div className={styles.smilometer}>
      <CircularProgressbar
        value={smilePercentage}
        minValue={0}
        text={`${smilePercentage}%`}
        styles={buildStyles({
          trailColor: '#171717',
          pathColor: smilePercentage === 100 ? '#52d42a' : '#005fee',
          textColor: '#ebebeb',
          textSize: '14px',
        })}
      />
      <h2>Smilometer</h2>
    </div>
  );
};

Smilometer.propTypes = {
  emotions: PropTypes.object,
};

export default Smilometer;
