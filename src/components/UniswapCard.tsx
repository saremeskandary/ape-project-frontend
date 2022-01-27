import React from "react";
import { BsFillGearFill } from "react-icons/bs";

interface PlaceHolder{
    name: string    
}

function PlaceHolder({name}: PlaceHolder) {
  return (
    <div>
      <input type="number" name="price" id="" />
      <button>{name}</button>
    </div>
  );
}

const UniswapCard = () => {
  return (
    <div>
      <div>
        <div>Swap</div>
        <BsFillGearFill />
      </div>
      <iframe
        title="This is a unique title"
        src="https://app.uniswap.org/#/swap?outputCurrency=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
        height="660px"
        width="100%"
        className="uniSwap"
      />
      <PlaceHolder name="ETH" />
      <PlaceHolder name="ETH" />
      <button>enter an amount</button>
    </div>
  );
};

export default UniswapCard;
