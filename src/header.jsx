import React from 'react'




    const CryptoHeader = () => {
        return (
            <header className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-700 via-blue-500 to-green-400 text-white shadow-lg border-b-4 border-yellow-500">
                <h1 className="text-2xl font-extrabold tracking-wider uppercase">Crypto Hub</h1>
                <nav className="flex space-x-6 text-lg">
                    <a href="#" className="hover:text-yellow-300 transition">Home</a>
                    <a href="#" className="hover:text-yellow-300 transition">Market</a>
                    <a href="#" className="hover:text-yellow-300 transition">News</a>
                    <a href="#" className="hover:text-yellow-300 transition">Contact</a>
                </nav>
            </header>
        );
    };

export default CryptoHeader;
