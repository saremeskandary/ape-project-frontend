import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { load } from "./components/W3functions";
import UniswapExchangePage from "./pages/UniswapExchangePage";
import MiningAcceleratorPage from "./pages/MiningAcceleratorPage";
import ChartPlatformV2Page from "./pages/ChartPlatformV2Page";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import silver from "./assets/images/Silver Diamond-01.png";
import gold from "./assets/images/Gold Diamond-01.png";
import title from "./assets/images/The Ape Project Site Logo-01-01.png";

declare global {
  interface Window {
    ethereum: any;
  }
}

// TODO get monkey data from IPFS or a website

export const apeAddress = "0x29b57e2b404357e65a4f4b46cdc43cea05719e99";

function App() {
  const [wallet, setWallet] = useState<string>("not conected");

  useEffect(() => {
    load().then(async (a) => setWallet(await a.signer.getAddress()));
  }, []);

  // const provider = new ethers.providers.JsonRpcProvider();
  // const apeContract = new ethers.Contract(apeAddress, abi, provider);
  // const data = await apeContract.fetchMarketItems(); // FIXME

  return (
    <div className="App">
      <header className="App-header">
        <img src={title} alt="title" height={50} />
        <div >
          <div style={{ display: "flex", flexDirection: "row", alignItems:'center'}}>
            <div>
              <img
                src={silver}
                alt="Silver"
                style={{ width: 100, height: 100 }}
              />
              <img src={gold} alt="Gold" style={{ width: 100, height: 100 }} />
            </div>
            <div>{wallet}</div>
          </div>
        </div>
      </header>
      <main className="App-main">
        {
          <Link
            to={
              window.location.pathname === "/mining-accelerator"
                ? "/"
                : window.location.pathname === "/chart-platform"
                ? "/mining-accelerator"
                : window.location.pathname === "/"
                ? "/chart-platform"
                : ""
            }
          >
            <FaAngleLeft />
          </Link>
        }
        <Routes>
          <Route path="/" element={<UniswapExchangePage />} />
          <Route
            path="mining-accelerator"
            element={<MiningAcceleratorPage />}
          />
          <Route path="chart-platform" element={<ChartPlatformV2Page />} />
        </Routes>
        {
          <Link
            to={
              window.location.pathname === "/"
                ? "/mining-accelerator"
                : window.location.pathname === "/mining-accelerator"
                ? "/chart-platform"
                : window.location.pathname === "/chart-platform"
                ? "/"
                : ""
            }
          >
            <FaAngleRight />
          </Link>
        }
      </main>
    </div>
  );
}

export default App;
