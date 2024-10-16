import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Circuit.css';

const Dsbsc = () => {
  const [messageFrequency, setMessageFrequency] = useState(1);
  const [carrierFrequency, setCarrierFrequency] = useState(1);
  const [result, setResult] = useState(null);
   const [sinWaveData0, setSinWaveData0] = useState(null);
  const [sinWaveDatadsbsc, setSinWaveDatadsbsc] = useState(null);
    const [demodulation_dsbsc, setdemodulation_dsbsc] = useState(null);

  const handleMessageFrequencyChange = (event) => {
    setMessageFrequency(Number(event.target.value));
  };

  const handleCarrierFrequencyChange = (event) => {
    setCarrierFrequency(Number(event.target.value));
  };


const handleClick0 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/process_data_0?frequency=${messageFrequency}`
      );
      setSinWaveData0(response.data.sinWaveData0);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/process_data_dsbsc?frequency=${messageFrequency}&amplitude=${carrierFrequency}`
      );
      setSinWaveDatadsbsc(response.data.sinWaveDatadsbsc);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  const handleClick1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/demodulation_dsbsc?frequency=${messageFrequency}&amplitude=${carrierFrequency}`
      );
      setdemodulation_dsbsc(response.data.demodulation_dsbsc);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  return (
            <>
        <div>
        <div className="oscillator">
            <div className="text1">
            AUDIO OSCILLATOR

            </div>
			
            {/* <div className="wire">Goku</div> */}
            {/* <div className="roller1"><div className="roller2"></div></div> */}
            <div className="node1">
                <div className="text2">SYNC</div>
            </div>
            <div className="node2">
            <div className="text2">cos(wt)</div>
            </div>
			<br/>
			<div className="cont" align="center">
              <label>
			  <br/><br/>
        Message Frequency:<br/>
        <input
          type="range"
          min="1"
          max="10000"
		  style={{ width: '140px' }}
          value={messageFrequency}
          onChange={handleMessageFrequencyChange}
        />
        {messageFrequency}
        <br />
      </label>
            </div>
            <div className="node3">
            <div className="text2">TTL</div>
            </div>
            <div className="node4">
            <div className="text2">sin(wt)</div>
            </div>
        </div>
        <div className="Adder">

            <div className="node4">
            <div className="text2">GA+gB</div>
            </div>
            <div className="node5">
			
            <div className="text2">A</div>
            </div>


            <div className="node6">
            <div className="text2">B</div>
            </div>
            <div className="text1">
                ADDER
            </div>
        </div>
        <div className="Multiplier">
        <div className="node4">
            <div className="text2">kXY</div>
            </div>
            <div className="node5">
            <div className="text2">X</div>
            </div>
            
            <div className="node6">
            <div className="text2">Y</div>
            </div>
            <div className="text1">
                Multiplier
            </div>
            <div class="container">

			<label>
          <h1>Message Signal (Audio Oscillator O/P)</h1>
          <button onClick={handleClick0}>Generate</button>
          {sinWaveData0 && (
            <div>
              <h3></h3>
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines',
                    x: sinWaveData0.x,
                    y: sinWaveData0.y,
                    marker: { color: 'blue' },
                    name: 'Sine Wave',
                  },
                ]}
                layout={{ width: 500, height: 300, title: '' }}
              />
            </div>
          )}
		  </label>
<label>
          <h1>DSBSC Signal</h1>
          <button onClick={handleClick}>Generate</button>
          {sinWaveDatadsbsc && (
            <div>
              <h3></h3>
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines',
                    x: sinWaveDatadsbsc.x,
                    y: sinWaveDatadsbsc.y,
                    marker: { color: 'blue' },
                    name: 'Sine Wave',
                  },
                ]}
                layout={{ width: 500, height: 300, title: '' }}
              />
            </div>
          )}
		  </label>
		  <label>
          <h1>Demodulation</h1>
          <button onClick={handleClick1}>Generate</button>
          {demodulation_dsbsc && (
            <div>
              <h3></h3>
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines',
                    x: demodulation_dsbsc.x,
                    y: demodulation_dsbsc.y,
                    marker: { color: 'blue' },
                    name: 'Sine Wave',
                  },
                ]}
                layout={{ width: 500, height: 300, title: '' }}
              />
            </div>
          )}
		  </label>
        </div>
        </div>
        <div>
        </div>
        <div className="VariableDC">
        <div className="node2">
            <div className="text2">+5V</div>
            </div>
            <div className="node3">
            <div className="text2">DC</div>
            </div>
            <div className="node4">
            <div className="text2">GND</div>
            </div>
            <div className="text1">
                Variable DC
            </div>
        </div>
        <div className="MasterSignals">
        <div className="node2">
            <div className="text2">sin(wt)</div>
            </div>
			<div className="cont" align="center">
              <label>
			  <br/><br/>
        Carrier Frequency:
        <input
          type="range"
          min="1"
          max="10000"
		  style={{ width: '140px' }}
          value={carrierFrequency}
          onChange={handleCarrierFrequencyChange}
        />
        {carrierFrequency}
        <br />
      </label>
            </div>
            <div className="node3">
            <div className="text2">TTL</div>
            </div>
            <div className="node4">
            <div className="text2">sin(ut)</div>
            </div>
            <div className="node7">
            <div className="text2">sin(wt)</div>
            </div>
            <div className="node8">
            <div className="text2">TTL</div>
            </div>
            <div className="text1">
                Master Signals
            </div>
        </div>
</div>
</>
  );
};

export default Dsbsc;
