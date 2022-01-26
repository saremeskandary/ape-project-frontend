import React from "react";

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
        <img src="gearIcon" alt="setting" /> {/* TODO add Icon */}
      </div>
      <PlaceHolder name="ETH" />
      <PlaceHolder name="ETH" />
      <button>enter an amount</button>
    </div>
  );
};

export default UniswapCard;
