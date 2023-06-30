import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import Dashboard from "./dashboard";
export default function Web3Data(props) {
  const { web3Context } = props;
  const { networkId, networkName, accounts, providerName, lib } = web3Context;
  const [balance, setBalance] = useState(0);
  const getBalance = useCallback(async () => {
    let balance =
      accounts && accounts.length > 0
        ? lib.utils.fromWei(await lib.eth.getBalance(accounts[0]), "ether")
        : "Unknown";
    setBalance(balance);
  }, [accounts, lib.eth, lib.utils]);

  useEffect(() => {
    getBalance();
  }, [accounts, getBalance, networkId]);

  const requestAuth = async (web3Context) => {
    try {
      await web3Context.requestAuth();
    } catch (e) {
      console.error(e);
    }
  };
  const requestAccess = useCallback(
    () => requestAuth(web3Context),
    [requestAuth]
  );
  return <Dashboard fromAddress={accounts[0]}></Dashboard>;
}
