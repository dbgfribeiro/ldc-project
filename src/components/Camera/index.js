import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as faceapi from "face-api.js";
import { exportComponentAsJPEG } from "react-component-export-image";

import EmotionsReader from "../EmotionsReader";
import Smilometer from "../Smilometer";

import styles from "./camera.module.scss";

const Camera = () => {
  const [emotions, setEmotions] = useState({});
  const [capture, setCapture] = useState(0);
  const videoWidth = 640;
  const videoHeight = 480;
  const videoRef = useRef();
  const canvasRef = useRef();
  const resultCanvasRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
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
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
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
        setEmotions(detections[0].expressions);
      }
    }, 100);
  };

  const neonColors =
    "rgba(" +
    emotions.sad * 50 +
    "," +
    emotions.happy * 50 +
    "," +
    emotions.neutral * 50 +
    ")";

  const handleCapture = () => {
    if (capture <= 1) {
      setCapture(capture + 1);
    }
    if (capture === 1) {
      console.log("Taking photograph...");
      var canvas = document.getElementById("resultCanvas");
      var video = document.getElementById("cameraVideo");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      resultCanvasRef.current
        .getContext("2d")
        .drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      exportComponentAsJPEG(resultCanvasRef, { fileName: "portrait.jpg" });
    }
    // navigate("/gallery");
  };

  return (
    <div
      className={styles.camera}
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
        <EmotionsReader emotions={emotions} />
        <Smilometer emotions={emotions} handleCapture={handleCapture} />
      </div>
      <canvas
        className={styles.resultCanvas}
        ref={resultCanvasRef}
        id="resultCanvas"
      ></canvas>
      {capture == 1 && <div className={styles.flash}></div>}
    </div>
  );
};

export default Camera;
