import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoInfo from './CryptoInfo';
import CoinDetails from './CoinDetails';
import './index.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/coin" element={<CryptoInfo />} />
                <Route path="/coin/:symbol" element={<CoinDetails />} />
            </Routes>
        </div>
    );
}

export default App;