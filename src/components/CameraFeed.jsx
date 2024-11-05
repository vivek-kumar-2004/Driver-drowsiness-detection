import React, { useEffect, useRef, useState } from 'react';

const CameraFeed = ({ setDrowsinessPrediction }) => {
  const videoRef = useRef(null);
  const [score, setScore] = useState(0);
  const alarmSoundRef = useRef(new Audio('/alarm.wav'));

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startVideo();

    return () => {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const captureFrameAndSend = async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('frame', blob, 'frame.jpg');

      try {
        const response = await fetch('http://localhost:5000/detect', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        setScore(data.score);
        setDrowsinessPrediction((data.score / 10) * 2);  

        if (data.alert) {
          alarmSoundRef.current.play().catch(err => console.error('Error playing sound:', err));
        } else {
          alarmSoundRef.current.pause();
          alarmSoundRef.current.currentTime = 0;
        }
      } catch (error) {
        console.error('Error during frame capture:', error);
      }
    }, 'image/jpeg');
  };

  useEffect(() => {
    const intervalId = setInterval(captureFrameAndSend, 3000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
      <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden p-4 w-full h-full">
        <h1 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Live Camera Feed</h1>

        <div className="flex justify-center mb-4 h-64 md:h-96">
          <video
            ref={videoRef}
            autoPlay
            className="rounded-lg w-full h-full object-cover" 
          />
        </div>

        <div className="text-center">
          <p className={`text-lg font-bold ${score > 3 ? 'text-red-800' : 'text-green-600'} transition-all duration-300`}>
            Driver Status: {score > 3 ? 'Drowsy' : 'Alert'}
          </p>
          <p className="text-md mt-1">Score: <span className="font-extrabold">{score}</span></p>
          <p className="mt-1 text-sm text-gray-500">Monitoring every 3 seconds...</p>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;
