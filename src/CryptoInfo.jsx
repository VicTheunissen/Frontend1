import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const CryptoInfo = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCoin, setSelectedCoin] = useState(null); // State for selected coin
    const navigate = useNavigate();

    const API_URL = `https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD`;
    const ITEMS_PER_PAGE = 20;
    const EXCHANGE_RATE = 0.88;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                const list = data?.Data?.LIST || [];
                setCryptoData(list);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const toggleFavorite = (crypto) => {
        setFavorites((prev) =>
            prev.includes(crypto) ? prev.filter((fav) => fav !== crypto) : [...prev, crypto]
        );
    };

    const filteredData = cryptoData.filter((crypto) =>
        crypto.SYMBOL?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPageData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleCoinClick = (coin) => {
        console.log(coin.SYMBOL);
        navigate(`/coin/${coin.SYMBOL}`);
    };

    const closeDetails = () => {
        setSelectedCoin(null); // Close the modal
    };

    const top10 = cryptoData.slice(0, 10);
    const chartData = {
        labels: top10.map((crypto) => crypto.SYMBOL || "N/A"),
        datasets: [
            {
                data: top10.map((crypto) => crypto.CIRCULATING_MKT_CAP_USD || 0),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                ],
            },
        ],
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Crypto Prices in EUR</h1>
            <input
                type="text"
                placeholder="Search coins..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ height: "400px", position: "relative" }}>
                <h2>Top 10 Cryptocurrencies Market Share</h2>
                <Doughnut data={chartData} />
            </div>
            <h2>Favorites</h2>
            <ul>
                {favorites.map((crypto, index) => (
                    <li key={index}>
                        {crypto.SYMBOL}: €{(parseFloat(crypto.PRICE_USD) * EXCHANGE_RATE).toFixed(2)}
                    </li>
                ))}
            </ul>
            <h2>All Coins</h2>
            <ul>
                {currentPageData.map((crypto, index) => (
                    <li key={index} onClick={() => handleCoinClick(crypto)}>
                        {crypto.SYMBOL}: €{(parseFloat(crypto.PRICE_USD) * EXCHANGE_RATE).toFixed(2)}
                        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(crypto); }}>
                            {favorites.includes(crypto) ? "Un-favourite" : "Favourite"}
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} of {totalPages} </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

            {selectedCoin && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedCoin.SYMBOL} Details</h2>
                        <p>Price: €{(parseFloat(selectedCoin.PRICE_USD) * EXCHANGE_RATE).toFixed(2)}</p>
                        <p>Market Cap: €{(selectedCoin.CIRCULATING_MKT_CAP_USD * EXCHANGE_RATE).toFixed(2)}</p>
                        <p>Volume: €{(selectedCoin.VOLUME_24H_USD * EXCHANGE_RATE).toFixed(2)}</p>
                        <button onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CryptoInfo;