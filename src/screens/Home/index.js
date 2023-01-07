import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';

import Camera from '../../components/Camera';
import Messages from '../../components/Messages';
import Gallery from '../Gallery';

import useTimeout from '../../hooks';
import shutter from '../../assets/shutter.mp3';

const Home = () => {
  const [newImage, setNewImage] = useState('');
  const [countdownStart, setCountdownStart] = useState(false);
  const [playShutter] = useSound(shutter);

  useTimeout(
    () => {
      window.location.reload();
    },
    newImage !== '' ? 30 * 1000 : null
  );

  useEffect(() => {
    if (newImage !== '') {
      playShutter();
    }
  }, [newImage]);

  return (
    <div className="wrapper">
      {newImage !== '' && <div className="flash"></div>}
      <Messages countdownStart={countdownStart} hide={newImage !== ''} />
      <Gallery lastImage={newImage} />
      <Camera
        setNewImage={setNewImage}
        setCountdownStart={setCountdownStart}
        hide={newImage !== ''}
      />
    </div>
  );
};

export default Home;
