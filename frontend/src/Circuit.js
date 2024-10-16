import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Circuit.css';
import './Wire.css';


const Circuit = () => {
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
        <div className="wireHor wireHor-1"></div>
        <div className="wireHor wireHor-2"></div>
        <div className="wireHor wireHor-3"></div>
        <div className="wireHor wireHor-4"></div>
        <div className="wireHor wireHor-5"></div>
        <div className="wireHor wireHor-6"></div>
        <div className="wireHor wireHor-7"></div>
        <div className="wireHor wireHor-8"></div>
        <div className="wireHor wireHor-9"></div>
        <div className="wireHor wireHor-10"></div>
        <div className="wireHor wireHor-11"></div>
        <div className="wireVer wireVer-1"></div>
        <div className="wireVer wireVer-2"></div>
        <div className="wireVer wireVer-3"></div>
        <div className="wireVer wireVer-4"></div>
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
	          <button className="btn" onClick={handleClick0}>Generate</button>
            </div>
            <div className="node3">
            <div className="text2">TTL</div>
            </div>
            <div className="node4">
            <div className="text2">sin(wt)</div>
            </div>
        </div>
        <div className="Adder">
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
        </div>
        <div className="Multiplier">
        <div className="node4">
            <div className="text2">kXY</div>
            </div>
            <div className="node5">
            <div className="text2">X</div>
            </div>
            	            
            <div className="node6">
            <button className="btn btn-1" onClick={handleClick}>Generate</button>
            <div className="text2">Y</div>
            </div>


           <div className="text1">
                Multiplier
            </div>
												
            <div class="container">
<img src="AM_Tims.png" alt="Header Image" class="header-image" />

<div>
  <div>
  
    <label>

          <button onClick={handleClick}></button>
          {sinWaveData && (
            <div>
              <h3></h3>
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
                layout={{ width: 500, height: 300, title: 'Modulated Signal (Multiplier Output)' }}
              />
            </div>
          )}

		  </label>
		  
		 
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
          <button onClick={handleClick0}></button>
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

      

</div>



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
</div>
</>
  );
};

export default Circuit;
