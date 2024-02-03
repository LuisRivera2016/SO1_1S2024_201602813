import  { useState } from 'react';

const Datos = () => {
  const [responseData, setResponseData] = useState(null);

  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/data');
      const data = await response.json();
      console.log(data)
      setResponseData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Llamar Datos GO</button>
      {responseData && (
        <div>
          <h2>Respuesta de Datos:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
      
    </div>
  );
};

export default Datos;
