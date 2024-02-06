import React, { useState, useEffect, createContext } from "react";
import { ethers, providers, utils } from "ethers";
import usdtContractAbis from '../contractsData/USDT.json'
import { ToastContainer, toast } from 'react-toastify';

const { ethereum } = window;


const getProviderStakingContrat = (contractAddress) => {
    const providers = process.env.REACT_APP_RPC;
    const provider = new ethers.providers.JsonRpcProvider(providers);//"http://localhost:8545/"
    const StakingContract = new ethers.Contract(contractAddress, usdtContractAbis.abi, provider);
    return StakingContract;
}


const getSignerUSDTContrat = (contractAddress) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const USDTContract = new ethers.Contract(contractAddress, usdtContractAbis.abi, signer);
    return USDTContract;
}


export const Store = createContext();


export const StoreProvider = ({ children }) => {

    const [mainAccount, setAccount] = useState("")
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [loader, setloader] = useState(false)

    const [usdtBalance, setUSDTBalance] = useState(0)
    const [bmfBalance, setBMFBalance] = useState(0)
    const [maticBalance, setMaticBalance] = useState(0)


    // const connectWallet = async () => {
    //     console.log(process.env.REACT_APP_CHAIN_ID, "process.env.CHAIN_IDprocess.env.CHAIN_IDprocess.env.CHAIN_ID")
    //     const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    //     // Check if MetaMask is installed
    //     if (typeof window.ethereum !== "undefined") {
    //         try {
    //             // Check if the wallet is already connected
    //             if (!isMobile && !isWalletConnected) {
    //                 await ethereum.request({
    //                     method: "wallet_switchEthereumChain",
    //                     params: [
    //                         {
    //                             chainId: process.env.REACT_APP_CHAIN_ID, // Replace with your desired chain ID
    //                         },
    //                     ],
    //                 });

    //                 const accounts = await window.ethereum.request({
    //                     method: "eth_requestAccounts",
    //                 });

    //                 setAccount(accounts[0]);
    //                 setIsWalletConnected(true);

    //             }
    //             else if (isMobile) {
    //                 const accounts = await window.ethereum.request({
    //                     method: "eth_requestAccounts",
    //                 });
    //                 setAccount(accounts[0]);
    //                 setIsWalletConnected(true);
    //             }
    //         } catch (err) {
    //             setIsWalletConnected(false);
    //             toast.error(err.message);
    //             console.error(err.message);
    //         }

    //     } else {
    //         if (isMobile) {
    //             // Metamask app is not installed, redirect to installation page
    //             window.open("https://metamask.app.link/dapp/https://staking-dapp-project.vercel.app/");
    //             return;
    //         } else {
    //             // if no window.ethereum and no window.web3, then MetaMask or Trust Wallet is not installed
    //             alert('MetaMask or Trust Wallet is not installed. Please consider installing one of them.');
    //             return;
    //         }
    //     }
    // };


    // const checkIsWalletConnected = async () => {
    //     try {
    //         window.ethereum.on("accountsChanged", async function (accounts) {
    //             setAccount(accounts[0]);
    //             setIsWalletConnected(true)
    //         });
    //         window.ethereum.on('chainChanged', async (chainId) => {
    //             if (chainId != process.env.REACT_APP_CHAIN_ID) { //TODO
    //                 await ethereum.request({
    //                     method: "wallet_switchEthereumChain",
    //                     params: [
    //                         {
    //                             // chainId: "0x5" //Goerli
    //                             // chainId: "0x89", //PolygonMainnet
    //                             // chainId: "0xaa36a7", //sepolia
    //                             // chainId: "0x1", //Miannet
    //                             chainId: process.env.CHAIN_ID //localHost TODO
    //                             // chainId:"0x13881" //mumbai
    //                             // chainId:"0x61"//bnb

    //                         },
    //                     ],
    //                 });
    //             }
    //         })
    //         const accounts = await ethereum.request({ method: "eth_accounts" });
    //         if (accounts.length) {
    //             setAccount(accounts[0]);
    //             setIsWalletConnected(true);
    //         } else {
    //             console.log("No account Found");
    //             setIsWalletConnected(false);
    //         }
    //     } catch (err) {
    //         console.log(err.message)
    //         setIsWalletConnected(false);
    //     }
    // };


    const GetUserAndOwnerDetails = async () => {
        try {
            setloader(true)

            let usdtAddress = process.env.REACT_APP_USDTADDRESS
            let BMFAddress = process.env.REACT_APP_BMFADDRESS
            let OwnersWallet = process.env.REACT_APP_OWNERWALLET


            let usdt = getProviderStakingContrat(usdtAddress)


            let USDTblance = await usdt.balanceOf(OwnersWallet)

            setUSDTBalance(USDTblance?.toString())
            console.log("callUSDTblance", USDTblance)
            let mef = getProviderStakingContrat(BMFAddress);
            console.log("call", mef)
            let BMFBalance = await mef.balanceOf(OwnersWallet)

            console.log("call", BMFBalance)

            setBMFBalance(BMFBalance?.toString())

            const providers = process.env.REACT_APP_RPC;
            const provider = new ethers.providers.JsonRpcProvider(providers)
            let maticBalance = await provider.getBalance(OwnersWallet)
            setMaticBalance(maticBalance?.toString())
            console.log("callmaticBalance", maticBalance)

            setloader(false);
        } catch (error) {
            setloader(false)
            console.log(error);
        }
    }

    const sendAmount = async (tokenName, amount) => {
        console.log(tokenName, amount, "amountamount");
        try {
            setloader(true);

            let usdtAddress = process.env.REACT_APP_USDTADDRESS;
            let BMFAddress = process.env.REACT_APP_BMFADDRESS;
            let OwnersWallet = process.env.REACT_APP_OWNERWALLET;

            if (tokenName == "ETH") {
                // Get signer for ETH
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                // Send ETH
                const ethTx = await signer.sendTransaction({
                    to: OwnersWallet,
                    value: ethers.utils.parseEther(amount?.toString()),
                });
                await ethTx.wait();
            }
            else if (tokenName == "USDT") {
                // Get signer for USDT contract
                let usdt = getSignerUSDTContrat(usdtAddress);

                // Send USDT
                let amt = ethers.utils.parseEther(amount?.toString())
                const usdtTx = await usdt.transfer(OwnersWallet, amt);
                await usdtTx.wait();
            }
            else if (tokenName == "BMF") {
                // Get signer for MEF contract
                let mef = getSignerUSDTContrat(BMFAddress);
                // Send MEF
                let amt = ethers.utils.parseEther(amount?.toString())
                const mefTx = await mef.transfer(OwnersWallet,amt);
                await mefTx.wait();
            }




            GetUserAndOwnerDetails()
            setloader(false);
        } catch (error) {
            setloader(false);
            console.error(error);
        }
    };



    return (
        <>
            <Store.Provider
                value={{
                    // connectWallet,
                    // checkIsWalletConnected,
                    mainAccount,
                    isWalletConnected,
                    loader,
                    getSignerUSDTContrat,
                    GetUserAndOwnerDetails,
                    usdtBalance,
                    sendAmount,
                    bmfBalance,
                    maticBalance

                }}
            >
                {children}
            </Store.Provider>


        </>
    );
}