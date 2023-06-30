import React from "react";
import "./App.css";
import MainView from "./components/mainView";

import { useWeb3 } from "@openzeppelin/network/lib/react";

import Web3Data from "./components/Web3Data.js";

const infuraProjectId = "67171ab8322c425bbc3d33b19a5035c2";

function App() {
  const web3Context = useWeb3(
    `wss://goerli.infura.io/ws/v3/${infuraProjectId}`
  );

  return (
    <div className="App">
      <div>
        {/* <h1>Infura React Dapp with Components!</h1> */}
        {/* <MainView></MainView> */}
        <Web3Data title="Web3 Data" web3Context={web3Context} />
      </div>
    </div>
  );
}

export default App;
