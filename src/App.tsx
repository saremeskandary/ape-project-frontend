import React from "react";
import logo from "./logo.svg";
import { ethers } from "ethers";
import abi from "./contract/ABI.json";
import { BrowserRouter } from "react-router-dom";

declare global {
  interface Window {
    ethereum: any;
  }
}

async function getData() {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum); //(window as any);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner();

  const myContract = new ethers.Contract(
    "0x29b57e2b404357e65a4f4b46cdc43cea05719e99",
    abi,
    signer
  );

  let infuraProvider = new ethers.providers.InfuraProvider("rinkeby");
}

function App() {
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
              <div> my wallet address </div>
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
