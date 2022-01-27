import React from "react";
interface IMiningCard {
  image: string;
  onClick: any;
}
function MiningCard({ image, onClick }: IMiningCard) {
  return (
    <div>
      <img
        src={image}
        alt="miningAccelerator"
        style={{ width: 100, height: 100 }}
      />
      <button onClick={onClick}>buy</button>
    </div>
  );
}

export default MiningCard;