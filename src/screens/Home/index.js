import { useState } from 'react';

import React from 'react';
import Camera from '../../components/Camera';
import Countdown from '../../components/Countdown';
import Messages from '../../components/Messages';
import Gallery from '../Gallery';

const Home = () => {
  const [newImage, setNewImage] = useState('');

  return (
    <div className="wrapper">
      <header>
        <Messages />
      </header>
      <Gallery lastImage={newImage} />
      <Camera setNewImage={setNewImage} />
      <footer>
        <Countdown />
      </footer>
    </div>
  );
};

export default Home;
