import React from "react";
import { claim } from "../components/W3functions";

const ChartPlatformV2Page = () => {
  // mehtod = claim
  //TODO get list of user apes
  const monkeyList = ["monkey one", "monkey onkey two", "monkey three"];

  return (
    <div className="card">
      <div style={{ overflow: "auto" }}>
        {monkeyList.map((monkey) => {
          return (
            <div>
              <img src={monkey} alt="" />
            </div>
          );
        })}
      </div>

      <div>
        <button
          onClick={() => {
            claim(monkeyList); // add list of apes for claiming
          }}
        >
          Claim
        </button>
        <div>$VARIABLE EARNED</div>
        <div>1,000,000</div>
      </div>
    </div>
  );
};

export default ChartPlatformV2Page;
