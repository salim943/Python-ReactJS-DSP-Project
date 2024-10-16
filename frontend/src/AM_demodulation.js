import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Circuit.css';

const AM_demodulation = () => {
  const [messageFrequency, setMessageFrequency] = useState(1);
  const [carrierFrequency, setCarrierFrequency] = useState(1);
  const [A, setA] = useState(1);
  const [B, setB] = useState(1);
  const [result, setResult] = useState(null);
   const [sinWaveData0, setSinWaveData0] = useState(null);
      const [sinWaveDatac, setSinWaveDatac] = useState(null);
  const [sinWaveData, setSinWaveData] = useState(null);
    const [demodulation, setdemodulation] = useState(null);

  const handleMessageFrequencyChange = (event) => {
    setMessageFrequency(Number(event.target.value));
  };

  const handleCarrierFrequencyChange = (event) => {
    setCarrierFrequency(Number(event.target.value));
  };
  const handleAChange = (event) => {
    setA(Number(event.target.value));
  };
  const handleBChange = (event) => {
    setB(Number(event.target.value));
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
  
const handleClickc = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/process_data_c?amplitude=${carrierFrequency}`
      );
      setSinWaveDatac(response.data.sinWaveDatac);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  
  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/process_data_am?frequency=${messageFrequency}&amplitude=${carrierFrequency}&A1=${A}&B1=${B}`
      );
      setResult(response.data.result);
      setSinWaveData(response.data.sinWaveData);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  const handleClick1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/demodulation?frequency=${messageFrequency}&amplitude=${carrierFrequency}&A1=${A}&B1=${B}`
      );
      setdemodulation(response.data.demodulation);
    } catch (error) {
      console.error('Error making request:', error);
    }
  };
  return (
            <>
        <div>
        <div className="wireHor wireHor-2"></div>
        <div className="wireHor wireHor-12"></div>
        <div className="wireHor wireHor-13"></div>
        <div className="wireHor wireHor-14"></div>
        <div className="wireHor wireHor-15"></div>
        <div className="wireHor wireHor-16"></div>
        <div className="wireVer wireVer-5"></div>
        <div className="wireVer wireVer-6"></div>
        <div className="oscillator">
            <div className="text1">
            AUDIO OSCILLATOR

            </div>
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
	  <button className="btn" onClick={handleClick0}>Generate</button>
            </div>
            <div className="node3">
            <div className="text2">TTL</div>
            </div>
            <div className="node4">
            <div className="text2">sin(wt)</div>
            </div>
        </div>
        <div className="Utilities">
        <div className="node2">
            <div className="text3"></div>
            </div>
            <div className="node2 node2-1">
            <div className="text2">REF</div>
            </div>
            <div className="node3">
            <div className="text3 text3-2">Diode-lpf</div>
            </div>
            <div className="node3 node3-1">
            <div className="text2"></div>
            </div>
            <div className="node7">
            <div className="text3 text3-1">COMPARATOR</div>
            </div>
            <div className="node8">
            <div className="text3 text3-2">RECTIFIER</div>
            </div>
            <div className="node7 node7-1">
            <div className="text2"></div>
            </div>
            <div className="node8 node8-1">
            <div className="text2"></div>
            </div>
            <div className="node4">
            <div className="text3">RC-LPF</div>
            </div>
            <div className="node4 node4-1">
            <div className="text2"></div>
            </div>
            <div className="text1">
                Utilities
            </div>
        </div>
        <div className="Utilities Utilities-1">
        <div className="node2 node2-2">
            <div className="text2">Tune</div>
            </div>
            <div className="node3 node3-2">
            <div className="text2">Wide</div>
            </div>
            <div className="node4">
            <div className="text2">OUT</div>
            </div>
            <div className="node7 node7-2">
            <div className="text2">Gain</div>
            </div>
            <div className="node4 node4-1">
            <div className="text2">IN</div>
            </div>
            <div className="text1">
                Tuneable LPF
            </div>
        </div>
        {/* <div className="Adder">
		            <div className="cont" align="center">
              <label>
		
        G:<br/>
<input
  type="range"
  min="0"
  max="2"
  step="0.01" // Set step to a smaller value for decimal precision
  style={{ width: '140px' }}
  value={A}
  onChange={handleAChange}
/>
        {A}
        <br />
      </label>
	  </div>
	  		            <div className="cont1" align="center">
              <label>
        g:<br/>
<input
  type="range"
  min="0"
  max="2"
  step="0.01" // Set step to a smaller value for decimal precision
  style={{ width: '140px' }}
  value={B}
  onChange={handleBChange}
/>
        {B}
        <br />
      </label>
	  </div>
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
        </div> */}
        {/* <div className="Multiplier"> */}
        {/* <div className="node4">
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
            </div> */}
												
            
        <div>
        </div>
        {/* <div className="Utilities">
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
        </div> */}
        <div className="MasterSignals MasterSignals-1">
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
	            <button className="btn btn-2" onClick={handleClickc}>Generate</button>

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
        <div class="container">
<img className="image" src="AM_Tims.png" alt="Image" class="header-image" />

<div class="button-group">
  <div class="button">
  
   
		  
		 
		   <label>
          <button onClick={handleClickc}></button>
          {sinWaveDatac && (
            <div>
              <h3></h3>
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines',
                    x: sinWaveDatac.x,
                    y: sinWaveDatac.y,
                    marker: { color: 'blue' },
                    name: 'Sine Wave',
                  },
                ]}
                layout={{ width: 500, height: 300, title: 'Carrier Signal (Master Signal Output)' }}
              />
            </div>
          )}

		  </label>
		  
  <label>
          <button className="btn btn-3" onClick={handleClick0}>Generate</button>
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
                layout={{ width: 500, height: 300, title: 'Message Signal (Audio oscillator Output)' }}
              />
            </div>
          )}

		  </label>

  </div>

      <div class="button">
	  		  <label>
          <button className="btn btn-3" onClick={handleClick1}>Demodulated Signal</button>
          {demodulation && (
            <div>
              <h3></h3>
              <Plot
                data={[
                  {
                    type: 'scatter',
                    mode: 'lines',
                    x: demodulation.x,
                    y: demodulation.y,
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



        </div>
        </div>
{/* </div> */}
</>
  );
};

export default AM_demodulation;
