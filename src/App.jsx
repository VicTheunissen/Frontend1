import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CryptoInfo from './CryptoInfo.jsx';
import CoinDetails from './CoinDetails.jsx';
import './index.css';
import CryptoHeader from "./header.jsx";

const  App = ()=> {
  return (

      <div className="App">
    <CryptoHeader/>
        <Routes>
          <Route path="/" element={<CryptoInfo />} />
          <Route path="/coin/:symbol" element={<CoinDetails />} />
        </Routes>
      </div>

  )
}

export default App;