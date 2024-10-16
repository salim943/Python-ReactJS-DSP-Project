// YourComponent1.js
import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const YourComponent1 = () => {
  const [messageFrequency, setMessageFrequency] = useState(1);
  const [carrierFrequency, setCarrierFrequency] = useState(1);
  const [sinWaveDataFM, setSinWaveDataFM] = useState(null);

  const handleMessageFrequencyChange = (event) => {
    setMessageFrequency(Number(event.target.value));
  };

  const handleCarrierFrequencyChange = (event) => {
    setCarrierFrequency(Number(event.target.value));
  };

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/process_data_fm?messageFrequency=${messageFrequency}&carrierFrequency=${carrierFrequency}`
      );
      setSinWaveDataFM(response.data.sinWaveDataFM);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  return (
    <div className="container">
      <h2>Frequency Modulation</h2>
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
      <button onClick={handleClick}>Generate FM Wave</button>
      {sinWaveDataFM && (
        <div>
          <h3>FM Wave Chart</h3>
          <Plot
            data={[
              {
                type: 'scatter',
                mode: 'lines',
                x: sinWaveDataFM.x,
                y: sinWaveDataFM.y,
                marker: { color: 'red' },
                name: 'Sine Wave',
              },
            ]}
            layout={{ width: 500, height: 300, title: 'FM Wave Chart' }}
          />
        </div>
      )}
    </div>
  );
};

export default YourComponent1;
