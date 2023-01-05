import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './messages.module.scss';

import Countdown from '../Countdown';

const Messages = ({ countdownStart, hide }) => {
  const [customMessage, setCustomMessage] = useState(
    'Give me your best smile!'
  );
  const messagesList = [
    "I'm still waiting...",
    'Come on!',
    "That's the best you can do?",
    'Why so serious?',
    'Please smiiiile!',
    'Say cheese!',
  ];

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCustomMessage(
          messagesList[Math.floor(Math.random() * messagesList.length)]
        ),
      5000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={!hide ? styles.messageContainer : styles.hideMessages}>
      {!countdownStart ? (
        <h1 className={styles.message}>{customMessage}</h1>
      ) : (
        !hide && <Countdown />
      )}
    </div>
  );
};

Messages.propTypes = {
  countdownStart: PropTypes.bool,
  hide: PropTypes.bool,
};

export default Messages;
