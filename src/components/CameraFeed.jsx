import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

const CameraFeed = ({ setDrowsinessPrediction }) => {
  const videoRef = useRef(null);
  const modelRef = useRef(null);

  // Load the model
  const loadModel = async () => {
    modelRef.current = await tf.loadLayersModel('/model/model.json');
    console.log("Model Loaded");
  };

  useEffect(() => {
    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: 1280,
            height: 720,
          },
        })
        .then((stream) => {
          let video = videoRef.current;
          if (video) {
            video.srcObject = stream;
            video.play();
            video.addEventListener('loadeddata', () => {
              // Start predicting when the video is loaded
              predict();
            });
          }
        })
        .catch((err) => {
          console.error("Error accessing camera: ", err);
        });
    };

    const predict = async () => {
      // Ensure the model is loaded
      if (!modelRef.current) {
        console.error("Model not loaded");
        return;
      }

      const video = videoRef.current;
      const tfImg = tf.browser.fromPixels(video);

      // Preprocess the image (resize, normalize, etc.)
      const resizedImg = tf.image.resizeBilinear(tfImg, [224, 224]); // Adjust size
      const normalizedImg = resizedImg.div(255.0); // Normalize pixel values

      const batchedImg = normalizedImg.expandDims(0); // Create a batch

      const predictions = await modelRef.current.predict(batchedImg).data();
      const predictionValue = predictions[0]; // Adjust based on your model output
      setDrowsinessPrediction(predictionValue);

      // Call predict again after a short delay
      setTimeout(predict, 1000);
    };

    loadModel();
    getVideo();

    return () => {
      // Stop video stream on cleanup
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [videoRef, setDrowsinessPrediction]);

  return (
    <div className="camera-container bg-gray-100 p-4 rounded-lg shadow-lg">
      <video
        ref={videoRef}
        className="w-full h-auto rounded-lg"
        autoPlay
        playsInline
        muted
      />
    </div>
  );
};

export default CameraFeed;
