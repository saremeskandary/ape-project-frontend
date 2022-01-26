import React from "react";

const ChartPlatformV2 = () => {
  // mehtod = claim

  const monkeyList = ["monkey one", "monkey onkey two", "monkey three"];
  return (
    <div>
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
        <button>Claim</button>
        <div>$VARIABLE EARNED</div>
        <div>1,000,000</div>
      </div>
    </div>
  );
};

export default ChartPlatformV2;
