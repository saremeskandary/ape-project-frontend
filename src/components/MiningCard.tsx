import React from "react";
interface IMiningCard {
  image: string;
}
function MiningCard({ image }: IMiningCard) {
  return (
    <div>
      <img src={image} alt="miningAccelerator" />
      <button>buy</button>
    </div>
  );
}

export default MiningCard;