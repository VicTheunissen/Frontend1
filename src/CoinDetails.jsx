import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CoinDetails = () => {
    const { symbol } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = `https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100`;

    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();

                if (!data || !data.Data) {
                    return setError('No data found');
                }

                const coinData = data.Data?.LIST.find((c) => c.SYMBOL.toUpperCase() === symbol.toUpperCase());
                setCoin(coinData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCoin();
    }, [symbol]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!coin) return <p>Coin not found</p>;

    return (
        <div>
            <h1>{coin.SYMBOL} Details</h1>
            <p>Price: €{(parseFloat(coin.PRICE_USD) * 0.88).toFixed(2)}</p>
            <p>Market Cap: €{(coin.CIRCULATING_MKT_CAP_USD * 0.88).toFixed(2)}</p>
            <p>Volume: €{(coin.VOLUME_24H_USD * 0.88).toFixed(2)}</p>
        </div>
    );
};

export default CoinDetails;