import React from 'react';
import BarChart from './components/BarChart';
import HeaderRow from './components/HeaderRow';
import Navbar from './components/Navbar';
import Patient from './components/Patient';
import './App.css';

function App() {
  return (
    <div className="bg-blue-200">
      {/* <BarChart/> */}
    <Navbar/>
    <HeaderRow/>
    <Patient id={0} />
    <Patient id={1} />
    <Patient id={2} />
    <Patient id={3} />
    <Patient id={4} />
    
    </div>
  );
}

export default App;
