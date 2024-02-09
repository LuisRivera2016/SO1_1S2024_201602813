import React, { useState, useRef } from 'react';
import axios from 'axios';

const CameraCapture = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [photoData, setPhotoData] = useState('');

  // Función para capturar la foto
  const capturePhoto = async () => {
    const video = videoRef.current;

    // Detenemos la transmisión de la cámara
    video.pause();

    // Capturamos el frame actual del vídeo
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertimos el frame a base64
    const dataURL = canvas.toDataURL('image/png');
    setPhotoData(dataURL);

    // Reanudamos la transmisión de la cámara
    video.play();

    // Enviamos la foto a la API
    try {
      await axios.post('http://localhost:3000/upload-photo', { photo: dataURL });
      console.log('Foto enviada correctamente a la API');
    } catch (error) {
      console.error('Error al enviar la foto a la API:', error);
    }
  };

  // Función para iniciar la cámara
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  };

  // Iniciar la cámara cuando el componente se monte
  React.useEffect(() => {
    startCamera();
    // Detener la cámara cuando el componente se desmonte
    return () => {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay={true} />
      <br></br>
      <button onClick={capturePhoto}>Tomar Foto</button>
      {photoData && (
        <div>
          <h2>Foto Capturada</h2>
          <img src={photoData} alt="Foto Capturada" />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraCapture;