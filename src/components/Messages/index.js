import React, { useState, useEffect } from "react";
import styles from "./messages.module.scss";

const Messages = () => {
  const [customMessage, setCustomMessage] = useState(
    "Give me your best smile!"
  );
  const messagesList = [
    "I'm still waiting...",
    "Come on!",
    "That's the best you can do?",
    "Why so serious?",
    "Please smiiiile!",
    "Say cheese!",
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

  return <h1 className={styles.message}>{customMessage}</h1>;
};

export default Messages;
