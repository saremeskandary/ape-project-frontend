import React from "react";
import MiningCard from "../components/MiningCard";
import { buyMining } from "../components/W3functions";
import gold from "./../assets/images/Mining Accerelator NFT Gold 1.1.png";
import silver from "./../assets/images/Mining Accerelator NFT Silver 1.1.png";

const MiningAcceleratorPage = () => {
  // mehtod = mint
  return (
    <div className="card">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MiningCard
          image={silver}
          onClick={() => {
            buyMining(1, 1); //FIXME in buyMining we have 2 parameter second one is times I chose 1
          }}
        />
        <MiningCard
          image={gold}
          onClick={() => {
            buyMining(2, 1);
          }}
        />
      </div>
    </div>
  );
};

export default MiningAcceleratorPage;
