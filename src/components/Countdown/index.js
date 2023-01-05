import React, { useState } from 'react';

const Countdown = () => {
  const [counter, setCounter] = useState('3');
  if (counter > 0) {
    setInterval(() => {
      setCounter(String(counter - 1));
    }, 1000);
  } else if (counter == 0) {
    setCounter('Cheeeeese!');
  }

  return <h1 style={{ color: 'white', fontSize: '3rem' }}>{counter}</h1>;
};

export default Countdown;
