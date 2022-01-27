import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { load } from "./components/W3functions";
import UniswapExchangePage from "./pages/UniswapExchangePage";
import MiningAcceleratorPage from "./pages/MiningAcceleratorPage";
import ChartPlatformV2Page from "./pages/ChartPlatformV2Page";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import silver from "./assets/images/Silver Diamond-01.png";
import gold from "./assets/images/Gold Diamond-01.png";

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

  const navigate = useNavigate();

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
          <div className="App.">The ape project</div>
          <div>
            <div>
              <div>
                <img
                  src={silver}
                  alt="Silver"
                  style={{ width: 100, height: 100 }}
                />
                <img
                  src={gold}
                  alt="Gold"
                  style={{ width: 100, height: 100 }}
                />
              </div>
              <div>{wallet}</div>
            </div>
          </div>
        </div>
      </header>
      {window.location.pathname !== "/" && (
        <Link
          to={
            window.location.pathname === "/mining-accelerator"
              ? "/"
              : window.location.pathname === "/chart-platform"
              ? "/mining-accelerator"
              : ""
          }
        >
          <FaAngleLeft />
        </Link>
      )}
      <Routes>
        <Route path="/" element={<UniswapExchangePage />} />
        <Route path="mining-accelerator" element={<MiningAcceleratorPage />} />
        <Route path="chart-platform" element={<ChartPlatformV2Page />} />
      </Routes>
      <div>
        {window.location.pathname !== "/chart-platform" && (
          <Link
            to={
              window.location.pathname === "/"
                ? "/mining-accelerator"
                : window.location.pathname === "/mining-accelerator"
                ? "/chart-platform"
                : ""
            }
          >
            <FaAngleRight />
          </Link>
        )}
      </div>
    </div>
  );
}

export default App;
