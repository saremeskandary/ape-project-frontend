import React from "react";
import { claim } from "../components/W3functions";

const tempMonkeyImg = require('../assets/images/temp-monkey.png');

const ChartPlatformV2Page = () => {
  // mehtod = claim
  //TODO get list of users apes
  //TODO with list of users apes get pictures from API or IPFS
  // 1. what is the user apes methed name?
  // 2. what is the API of apes picturs?

  const monkeyList = ["monkey one", "monkey onkey two", "monkey three"];

  return (
    <div className="card" style={{flexDirection:'column', justifyContent:'center'}}>
      <div className="monkey-list">
        {monkeyList.map((monkey) => {
          return (
            <div>
              <img src={tempMonkeyImg} alt={monkey} className="monkey-img" />
            </div>
          );
        })}
      </div>

      <div className="claim-container">
        <button
          onClick={() => {
            claim(monkeyList); // add list of apes for claiming
          }}
          className="claim-btn"
        >
          CLAIM
        </button>
        <div className="claim-text">$VARIABLE EARNED</div>
        <div className="claim-text">1,000,000</div>
      </div>
    </div>
  );
};

export default ChartPlatformV2Page;
