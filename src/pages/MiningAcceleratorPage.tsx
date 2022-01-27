import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
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
            buyMining(1, 1);
          }} //TODO change args to silver number
        />
        <MiningCard
          image={gold}
          onClick={() => {
            buyMining(1, 1);
          }} //TODO change args to Gold number
        />
      </div>
    </div>
  );
};

export default MiningAcceleratorPage;
