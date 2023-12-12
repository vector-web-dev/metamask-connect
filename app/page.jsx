"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getConnectedWallet();
    walletEventListerner();
  });

  // Connect Wallet Function.
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) // returns an array of all metamask accounts possessed.
        setWalletAddress(accounts[0]);

        console.log(accounts[0]);
      } catch (error) {
        console.error(error.message);
      }
    } else {
      // Metamask is not installed
      console.log("Please install Metamask");
    }
  }

  // On reload, remember that I'm connected.
  const getConnectedWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" }) // returns an array of all metamask accounts possessed.
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else { 
          console.log("Connect your wallet through the connect button.");
        }
        
      } catch (error) {
        console.error(error.message);
      }
    } else {
      // Metamask is not installed
      console.log("Please install Metamask");
    }
  }

  // Connected Wallet EventListener
  const walletEventListerner = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      })
    } else {
      // Metamask is not installed
      setWalletAddress("");
      console.log("Please install Metamask");
    }
  }

  return (
    <div className='flex justify-between items-center gap-4 w-[90%] my-4 mx-auto'>
      <h2 className='text-2xl font-semibold'>Vector Wallet</h2>
      <button
        className='text-[#fff] font-medium border-0 py-2 px-4 bg-[#3B0DB7] rounded-lg'
        onClick={connectWallet}
      >{ walletAddress && walletAddress.length > 0 ? `Connected: ${walletAddress.slice(0, 5)}...${walletAddress.slice(38)}` : "Connect" }</button>
    </div>
  )
}
