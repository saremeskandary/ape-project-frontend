import React from "react";

const UniswapExchangePage = () => {
  // Variable Token  https://rinkeby.etherscan.io/token/0xa2245c99e853519b21c319310e54625e2a9b56f5?a=0x29b57E2B404357e65a4f4b46cDC43cEa05719e99
  const tokenAddress = "0x29b57E2B404357e65a4f4b46cDC43cEa05719e99"; //TODO add token address
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
