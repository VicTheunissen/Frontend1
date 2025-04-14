import {useEffect, useState} from "react"

const CryptoInfo = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = '';
    const API_URL = `https://api.coincap.io/v2/assets`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCryptoData(data.data); // Access the 'data' property
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array makes the effect run once

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Crypto Prices</h1>
            <ul>
                {cryptoData.map((crypto, index) => (
                    <li key={index}>
                        {crypto.name}: ${parseFloat(crypto.priceUsd).toFixed(6)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoInfo;