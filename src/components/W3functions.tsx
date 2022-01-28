import { ethers, Signer } from "ethers";
import Web3Modal from "web3modal";
import abi from "../contract/ABI.json";

export async function load() {
  const providerOptions = {
    /* See Provider Options Section */
  };

  const web3Modal = new Web3Modal({
    network: "rinbey", // optional
    cacheProvider: true, // optional
    providerOptions, // required
  });

  const instance = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(instance);

  const signer = provider.getSigner();

  const myContract = new ethers.Contract(
    "0x29b57e2b404357e65a4f4b46cdc43cea05719e99",
    abi,
    signer
  );

  let symbol = await myContract.symbol();
  const address = await signer.getAddress();
  let balance = await myContract.balanceOf(address);
  balance > 0
    ? console.log("you are NFT owner")
    : console.log("you are not owner"); 

  return { provider, signer, myContract };
}

export async function buyMining(MiningType: number, times: number) {
  const { myContract } = await load();
  const buyMining = await myContract.buyMining(MiningType, times);
  return buyMining;
}

export async function claim(owned: string[]) {
  let tokens = [];
  const { myContract } = await load();
  
  let objects = [];
  const claim = await myContract.claim(owned); //TODO maybe a list
  return claim;
}

// TODO get all userNFTs that it can claim
