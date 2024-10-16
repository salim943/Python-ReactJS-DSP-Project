// YourComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const YourComponent = () => {
  const [messageFrequency, setMessageFrequency] = useState(1);
  const [carrierFrequency, setCarrierFrequency] = useState(1);
  const [result, setResult] = useState(null);
  const [sinWaveData, setSinWaveData] = useState(null);

  const handleMessageFrequencyChange = (event) => {
    setMessageFrequency(Number(event.target.value));
  };

  const handleCarrierFrequencyChange = (event) => {
    setCarrierFrequency(Number(event.target.value));
  };

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/process_data_am?frequency=${messageFrequency}&amplitude=${carrierFrequency}`
      );
      setResult(response.data.result);
      setSinWaveData(response.data.sinWaveData);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  
  

  return (
    <div className="container">
      <h2>Amplitude Modulation</h2>
      <label>
        Message Frequency:
        <input
          type="range"
          min="1"
          max="10000"
          value={messageFrequency}
          onChange={handleMessageFrequencyChange}
        />
        {messageFrequency}
        <br />
      </label>
      <label>
        Carrier Frequency:
        <input
          type="range"
          min="1"
          max="10000"
          value={carrierFrequency}
          onChange={handleCarrierFrequencyChange}
        />
        {carrierFrequency}
        <br />
      </label>
      <button onClick={handleClick}>Generate AM Wave</button>
      {result !== null && <p>Result: {result}</p>}
      {sinWaveData && (
        <div>
          <h3>AM Wave Chart</h3>
          <Plot
            data={[
              {
                type: 'scatter',
                mode: 'lines',
                x: sinWaveData.x,
                y: sinWaveData.y,
                marker: { color: 'blue' },
                name: 'Sine Wave',
              },
            ]}
            layout={{ width: 500, height: 300, title: 'AM Wave Chart' }}
          />
        </div>
      )}
    </div>
  );
};

export default YourComponent;
