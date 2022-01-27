import React from "react";

const UniswapExchangePage = () => {
  const tokenAddress = '' //TODO add token address
  return (
    <div className="card">
      <iframe
        className="uniSwap"
        title="This is a unique title"
        src={`https://app.uniswap.org/#/swap?outputCurrency=${tokenAddress}`}
        height="500px"
        width="100%"
      />
    </div>
  );
};

export default UniswapExchangePage;
