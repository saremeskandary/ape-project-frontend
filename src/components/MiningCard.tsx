import React from "react";
interface IMiningCard {
  image: string;
  onClick: any;
}
function MiningCard({ image, onClick }: IMiningCard) {
  return (
    <div className="mining-card">
      <img
        src={image}
        alt="miningAccelerator"
        style={{ width: '23vw', height: 'auto', minWidth:150 }}
      />
      <button onClick={onClick} className="mining-btn">BUY</button>
    </div>
  );
}

export default MiningCard;