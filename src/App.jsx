import React from 'react'
import CryptoHeader from './header.jsx'
import CryptoInfo from './CryptoInfo'



function App() {
    return (
        <>
    <CryptoHeader/>
        <div className="App">
            <CryptoInfo />
        </div>
</>
    );
}

export default App;