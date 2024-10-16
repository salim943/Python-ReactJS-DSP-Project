// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar.js';
import Circuit from './Circuit';
import AM_demodulation from './AM_demodulation';
import FM from './FM';
import PM from './PM';


function App() {
  return (
  <Router>
    <div>
      <Sidebar />
      
        <Routes>
          <Route path="/AM" element={<Circuit />} />
          <Route path="/FM" element={<FM />} />
		  <Route path="/AM_demodulation" element={<AM_demodulation />} />
		  <Route path="/PM" element={<PM />} />
        </Routes>
     
    </div>
	</Router>
  );
}

export default App;



