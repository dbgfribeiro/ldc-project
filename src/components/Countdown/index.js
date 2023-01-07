import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import beep from '../../assets/beep.mp3';

const Countdown = () => {
  const [counter, setCounter] = useState('3');
  const [playBeep] = useSound(beep);

  if (counter > 0) {
    setInterval(() => {
      setCounter(String(counter - 1));
    }, 1000);
  } else if (counter == 0) {
    setCounter('Cheeeeese!');
  }

  useEffect(() => {
    playBeep();
  }, [counter]);

  return <h1 style={{ color: 'white', fontSize: '3rem' }}>{counter}</h1>;
};

export default Countdown;
