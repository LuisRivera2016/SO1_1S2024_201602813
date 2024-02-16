import { useState, useEffect, Suspense } from 'react';
import './App.css';
import { GetRamURL } from "../wailsjs/go/main/App.js";
import { CircularProgressbar } from 'react-circular-progressbar';
function App() {


  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetRamURL();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    const interval = setInterval(() => {
      fetchData();
    }, 500);

    return () => clearInterval(interval);
  }, []);



  return (

    <div>
      <h1>Prueba GOLANG</h1>
      {data === null ? <p>cargando</p> : (
        <div style={{width:300, height:300}}>
        <p>{data.totalRAM}</p>
        <CircularProgressbar value={data.porcentaje} text={`${data.porcentaje}%`}/>
        </div>
      )}



    </div>
  );
};

export default App
