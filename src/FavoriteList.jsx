import React from 'react';

// eslint-disable-next-line react/prop-types
const FavoriteList = ({favorites, EXCHANGE_RATE}) => {
  return (
    <div>
      <h2>Favorites</h2>
      <ul>
          {/* eslint-disable-next-line react/prop-types */}
        {favorites?.map((crypto, index) => (
          <li key={index}>
            {crypto.SYMBOL}: €{(parseFloat(crypto.PRICE_USD) * EXCHANGE_RATE).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteList;