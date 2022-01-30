import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
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
  const [previousPage, setPreviousPage] = useState<string>('/');
  const [nextPage, setNextPage] = useState<string>('/');
  const { pathname } = useLocation();

  console.log('path',pathname);

  useEffect(()=>{
  
    switch (pathname) {
      case '/': setPreviousPage('/chart-platform'); setNextPage('/mining-accelerator');
        break;
      case '/mining-accelerator': setPreviousPage('/'); setNextPage('/chart-platform');
        break;  
      case '/chart-platform': setPreviousPage('/mining-accelerator'); setNextPage('/')
        break; 
      default: setPreviousPage('/'); setNextPage('/');
        break;
    }

  },[pathname])

  useEffect(() => {
    load().then(async (a) => setWallet(await a.signer.getAddress()));
  }, []);

  // const provider = new ethers.providers.JsonRpcProvider();
  // const apeContract = new ethers.Contract(apeAddress, abi, provider);
  // const data = await apeContract.fetchMarketItems(); // FIXME

  return (
    <div className="App">
      <header className="App-header">
        <img src={title} alt="title" height="40vw" />
        <div >
          <div style={{ display: "flex", flexDirection: "row", alignItems:'center'}}>
            <div>
              <img
                src={silver}
                alt="Silver"
                style={{ width: '3vw', height: 'auto' }}
              />
              <img src={gold} alt="Gold" style={{ width: '3vw', height: 'auto' }} />
            </div>
            <div>{wallet}</div>
          </div>
        </div>
      </header>
      <main className="App-main">
        {
          <Link to={previousPage}>
            <FaAngleLeft size={100} color="gray" />
          </Link>
        }
        <Routes>
          <Route path="/" element={<UniswapExchangePage />} />
          <Route
            path="/mining-accelerator"
            element={<MiningAcceleratorPage />}
          />
          <Route path="/chart-platform" element={<ChartPlatformV2Page />} />
        </Routes>
        {
          <Link to={nextPage}>
            <FaAngleRight size={100} color="gray" />
          </Link>
        }
      </main>
    </div>
  );
}

export default App;
