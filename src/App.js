import React, { useContext, useEffect, useState } from 'react';
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import './App.css';
import { Web3Provider } from '@ethersproject/providers';
import Web3Modal from 'web3modal';
import { Store } from './Store/Store';
import { ethers } from 'ethers';

function App() {

  const { connectWallet,
    checkIsWalletConnected,
    mainAccount,
    isWalletConnected,
    GetUserAndOwnerDetails,
    usdtBalance,
    bmfBalance,
    maticBalance,
    sendAmount,
    loader
  } = useContext(Store);
  const [show, setShow] = useState(false)

  // // Function to be called on "Connect Wallet" button click
  // const [provider, setProvider] = useState(null);
  // const [signer, setSigner] = useState(null);
  // const connectWallet = async () => {
  //   // const web3Modal = new Web3Modal();
  //   // const selectedProvider = await web3Modal.connect();
  //   // setProvider(new Web3Provider(selectedProvider));

  //   const web3Modal = new Web3Modal();
  //   const selectedProvider = await web3Modal.connect();

  //   const newProvider = new Web3Provider(selectedProvider);
  //   setProvider(newProvider);

  //   // If the provider has a signer, set the signer
  //   if (newProvider.getSigner) {
  //     const newSigner = newProvider.getSigner();
  //     console.log("newSigner", newSigner)
  //     setSigner(newSigner);
  //   } else {
  //     // If the provider doesn't have a signer, use a read-only signer
  //     const readOnlyProvider = new StaticJsonRpcProvider(newProvider.connection.url);
  //     setSigner(readOnlyProvider);
  //   }
  // };

  // const handleConnectWalletClick = async () => {
  //   try {
  //     await connectWallet();
  //   } catch (error) {
  //     console.error('Error connecting wallet:', error);
  //   }
  // };
  // // Function to be called on "Pay Fee" button click
  // const handlePayFeeClick = () => {
  //   // Add your logic for paying the fee here
  //   console.log('Paying fee...');
  // };


  useEffect(() => {
    checkIsWalletConnected()
    GetUserAndOwnerDetails();
  }, [mainAccount, isWalletConnected])

  return (
    <div className="App">

      <button onClick={connectWallet} className="customButton">
        {isWalletConnected ? "Connected" : "Connect wallet"}
      </button>

      <div className="walletInfoSection">
        {isWalletConnected && (
          <>
            <h1> ADMIN WALLET DETAILS </h1>
            <p>Wallet Address: <span className="walletAddress">{mainAccount}</span></p>
            <p>USDT Balance: <span className="balance">{ethers.utils.formatEther(usdtBalance)}</span></p>
            <p>BMF Balance: <span className="balance">{ethers.utils.formatEther(bmfBalance)}</span></p>
            <p>Matic Balance: <span className="balance">{ethers.utils.formatEther(maticBalance)}</span></p>
          </>
        )}
      </div>

      {!show && (
        <button onClick={() => setShow(true)} className="customButton">
          PayBuyCrypto
        </button>
      )}

      {show && (
        <div>
          <button disabled={loader} onClick={() => sendAmount("USDT", "100")} className="customButton">Pay $100 USDT</button>
          <button disabled={loader} onClick={() => sendAmount("BMF", "100")} className="customButton">Pay 100 MEF</button>
          <button disabled={loader} onClick={() => sendAmount("ETH", "0.00001")} className="customButton">Pay 0.00001 Matic</button>
        </div>
      )}


    </div>
  );
}

export default App;
