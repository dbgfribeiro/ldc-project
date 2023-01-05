import { useState } from 'react';

import React from 'react';
import Camera from '../../components/Camera';
import Messages from '../../components/Messages';
import Gallery from '../Gallery';

const Home = () => {
  const [newImage, setNewImage] = useState('');
  const [countdownStart, setCountdownStart] = useState(false);

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
