import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as faceapi from 'face-api.js';

import { storage } from '../../firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';

import Smilometer from '../Smilometer';
import styles from './camera.module.scss';
import useTimeout from '../../hooks';

const Camera = ({ setNewImage, setCountdownStart, hide }) => {
  const [emotions, setEmotions] = useState({});
  const [readyToCapture, setReadyToCapture] = useState(false);

  const videoWidth = 640;
  const videoHeight = 480;
  const videoRef = useRef();
  const canvasRef = useRef();
  const resultCanvasRef = useRef();

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    ]).then(() => {
      faceDetection();
    });
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const faceDetection = async () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const resized = faceapi.resizeResults(detections, displaySize);

      // faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

      if (detections.length !== 0) {
        setEmotions(detections.expressions);
      }
    }, 100);
  };

  const handleCapture = () => {
    var canvas = document.getElementById('resultCanvas');
    var video = document.getElementById('cameraVideo');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // 1st
    // saves camera video as a canvas image
    resultCanvasRef.current
      .getContext('2d')
      .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    // 2nd
    // creates an image url form canvas
    canvas.toBlob(function (blob) {
      var image = new Image();
      image.src = blob;
      setNewImage(URL.createObjectURL(blob));
      // 3rd
      // sends the image url to firebase storage
      const storageRef = ref(storage, 'smile_' + Date.now() + '.jpg');
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          alert(error);
        }
      );
    });
  };

  const smilePercentage = Math.floor(emotions.happy * 100);
  const neutralScale = emotions.neutral;
  useEffect(() => {
    if (smilePercentage === 100 && neutralScale <= 0.001) {
      // setTimeout(handleCapture, 3000);
      setReadyToCapture(true);
      setTimeout(() => setCountdownStart(true), 1000);
    } else if (smilePercentage < 99) {
      setReadyToCapture(false);
      setCountdownStart(false);
    }
  }, [smilePercentage]);

  useTimeout(handleCapture, readyToCapture ? 4 * 1000 : null);

  // generate shadow colors
  const neonColors =
    'rgba(' +
    emotions.sad * 50 +
    ',' +
    emotions.happy * 50 +
    ',' +
    emotions.neutral * 50 +
    ')';

  return (
    <div
      className={!hide ? styles.camera : styles.cameraHidden}
      style={{
        borderColor: neonColors,
        boxShadow: `0 0 200px 20px ${neonColors}`,
      }}
    >
      <div className={styles.videoContainer}>
        <video
          id="cameraVideo"
          crossOrigin="anonymous"
          ref={videoRef}
          autoPlay
        ></video>
        <canvas
          ref={canvasRef}
          width={videoWidth}
          height={videoHeight}
          className={styles.canvas}
        />
      </div>
      <div className={styles.viewer}>
        <Smilometer emotions={emotions} />
      </div>
      <canvas
        className={styles.resultCanvas}
        ref={resultCanvasRef}
        id="resultCanvas"
      ></canvas>
    </div>
  );
};

Camera.propTypes = {
  setNewImage: PropTypes.func,
  setCountdownStart: PropTypes.func,
  hide: PropTypes.bool,
};

export default Camera;
