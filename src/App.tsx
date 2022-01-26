import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import abi from "./contract/ABI.json";
import { load } from "./components/W3functions";

declare global {
  interface Window {
    ethereum: any;
  }
}

// TODO get monkey data from IPFS or a website
// TODO copy uniswap frontend
// TODO
// TODO

export const apeAddress = "0x29b57e2b404357e65a4f4b46cdc43cea05719e99";

function App() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [wallet, setWallet] = useState<string>("not conected");
  useEffect(() => {
    load().then(async (a) => setWallet(await a.signer.getAddress()));
  }, []);

  async function buyMining(MiningType: number, times: number) {
    const { provider, signer, myContract } = await load();
    const buyMining = await myContract.buyMining(MiningType, times);
  }

  // const provider = new ethers.providers.JsonRpcProvider();
  // const apeContract = new ethers.Contract(apeAddress, abi, provider);
  // const data = await apeContract.fetchMarketItems(); // FIXME

  async function claim(owned: any) {
    const { provider, signer, myContract } = await load();
    const claim = await myContract.claim(owned); //TODO maybe a list
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div className="App.">the ape project</div>
          <div>
            <div>
              <div>
                <img src="" alt="gold" />
                <img src="" alt="silver" />
              </div>
              <div>{wallet}</div>
            </div>
          </div>
        </div>
      </header>

      <div>
        <button>arrow left</button>
        <button>arrow right</button>
      </div>
    </div>
  );
}

export default App;
