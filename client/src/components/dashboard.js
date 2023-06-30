import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VerticalBarChart from "./verticalBarChart";

// Contract ABI (Application Binary Interface)
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "material",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "addMaterial",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "machineId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "productionQuantity",
        type: "uint256",
      },
    ],
    name: "simulateConsumption",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getAllCertifiedProductCounts",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllMaterialStocks",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "machineId",
        type: "uint256",
      },
    ],
    name: "getCertifiedProducts",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string[]",
            name: "materials",
            type: "string[]",
          },
          {
            internalType: "uint256[]",
            name: "materialQuantities",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "productNumber",
            type: "uint256",
          },
        ],
        internalType: "struct SupplyManagement.CertifiedProduct[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "material",
        type: "string",
      },
    ],
    name: "getMaterialConsumptionHistory",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "material",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "quantity",
            type: "uint256",
          },
        ],
        internalType: "struct SupplyManagement.MaterialConsumption[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "materialTypes",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
    ],
    name: "random",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reorderQuantity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reorderThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalProductCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0x945c4B62F920E06cd2921E294c430597dF7128E8"; // Replace with your contract address

export default function ContractInteraction(props) {
  const [web3, setWeb3] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);

  const [materialStock, setMaterialStock] = useState([]);
  const [certifiedProducts, setCertifiedProducts] = useState([]);
  useEffect(() => {
    initialize();
    console.log("useEffect");
  }, []);

  // Initialize Web3 and Contract Instance
  const initialize = async () => {
    try {
      if (window.ethereum) {
        // Modern dapp browsers
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);
        const contractInstance = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        setContractInstance(contractInstance);
      } else if (window.web3) {
        // Legacy dapp browsers
        const web3 = new Web3(window.web3.currentProvider);
        setWeb3(web3);
        const contractInstance = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        setContractInstance(contractInstance);
      } else {
        console.log(
          "No web3 detected. Please install MetaMask or use a Web3-enabled browser."
        );
      }
    } catch (error) {
      console.error("Error initializing Web3:", error);
    }
  };
  const getAllMaterialStocks = async () => {
    try {
      const result = await contractInstance._methods
        .getAllMaterialStocks()
        .call();
      console.log(result);

      setMaterialStock(result);
    } catch (error) {
      //   alert("Please Initialize first! getAllMaterialStocks");
      initialize();
      console.error("Error calling getAllMaterialStocks:", error);
    }
  };

  const getCertifiedProducts = async () => {
    try {
      const result = await contractInstance._methods
        .getAllCertifiedProductCounts()
        .call();
      console.log(result);
      setCertifiedProducts(result);
    } catch (error) {
      initialize();

      //   alert("Please Initialize first! getCertifiedProducts");
      console.error("Error calling getCertifiedProducts:", error);
    }
  };

  const simulateConsumption = async (index) => {
    try {
      await contractInstance._methods
        .simulateConsumption(index, counts[index])
        .send({ from: props.fromAddress });
      console.log("Value set successfully!");
    } catch (error) {
      initialize();
      //   alert("Please Initialize first! simulateConsumption");
      console.error("Error calling simulateConsumption:", error);
    }
    setCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      updatedCounts[index] = 0;
      return updatedCounts;
    });
    getCertifiedProducts();
    getAllMaterialStocks();
  };

  const [counts, setCounts] = useState([0, 0, 0, 0]);

  const handleDecrement = (index) => {
    setCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      updatedCounts[index] = Math.max(0, updatedCounts[index] - 1);
      return updatedCounts;
    });
  };

  const handleIncrement = (index) => {
    setCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      updatedCounts[index] = updatedCounts[index] + 1;
      return updatedCounts;
    });
  };

  return (
    <div>
      <header>
        <h1>Simulate Production of Products</h1>
        {/* <button className="button" onClick={initialize}>
          Initialize
        </button> */}
      </header>

      <div className="container">
        {[1, 2, 3, 4].map((machine, index) => (
          <div className="machine" key={index}>
            <h2>Machine {machine}</h2>
            <button className="button" onClick={() => handleDecrement(index)}>
              -
            </button>
            <button
              className="button count-button"
              onClick={() => simulateConsumption(index)}>
              {counts[index]}
            </button>
            <button className="button" onClick={() => handleIncrement(index)}>
              +
            </button>
            {/* <h3>Products: {certifiedProducts[index]}</h3> */}
          </div>
        ))}
      </div>
      <div className="stockAndProductContent">
        <div className="stock-section">
          <h2>Stock of Materials</h2>
          <button className="button" onClick={getAllMaterialStocks}>
            Get Material Stock
          </button>
          <div id="stock" className="stock">
            <VerticalBarChart data={materialStock}></VerticalBarChart>
          </div>
        </div>

        <div className="statistics-section">
          <h2>History of Production</h2>
          <button className="button" onClick={getCertifiedProducts}>
            Get History
          </button>
          <div id="statistics" className="statistics">
            {[1, 2, 3, 4, 5].map((machine, index) => (
              <div className="machineStat" key={index}>
                <h2 style={{ width: 300 }}>
                  {machine === 5
                    ? `Total Production Count`
                    : `Machine ${machine}`}
                </h2>
                <button
                  style={{ width: 300, cursor: "default" }}
                  className="button">
                  {index === 4
                    ? certifiedProducts?.reduce((accumulator, currentValue) => {
                        return accumulator + parseInt(currentValue);
                      }, 0)
                    : parseInt(certifiedProducts[index] || 0)}
                  <span> Products</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
