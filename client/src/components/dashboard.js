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

const contractABINFT = [
  {
    inputs: [
      { internalType: "address", name: "initialOwner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "ERC721EnumerableForbiddenBatchMint", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "address", name: "owner", type: "address" },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "ERC721OutOfBoundsIndex",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "MINT_PRICE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "to", type: "address" }],
    name: "safeMint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractAddress = "0xC86C622C57c40c866D40D07B16109B459Cd72b05"; // Replace with your contract address
const contractAddressNFT = "0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c";

export default function ContractInteraction(props) {
  const [web3, setWeb3] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [nftContractInstance, setNftContractInstance] = useState(null);

  const [tokenID, setTokenID] = useState(null);
  const [materialStock, setMaterialStock] = useState([]);
  const [certifiedProducts, setCertifiedProducts] = useState([]);
  useEffect(() => {
    initialize();
    setTimeout(() => {}, 4000);
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

        const nftContractInstance = new web3.eth.Contract(
          contractABINFT,
          contractAddressNFT
        );

        setNftContractInstance(nftContractInstance);
      } else if (window.web3) {
        // Legacy dapp browsers
        const web3 = new Web3(window.web3.currentProvider);
        setWeb3(web3);
        const contractInstance = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        setContractInstance(contractInstance);

        const nftContractInstance = new web3.eth.Contract(
          contractABINFT,
          contractAddressNFT
        );

        setNftContractInstance(nftContractInstance);

        getAllMaterialStocks();
        getCertifiedProducts();
      } else {
        console.log(
          "No web3 detected. Please install MetaMask or use a Web3-enabled browser."
        );
      }
    } catch (error) {
      console.error("Error initializing Web3:", error);
    }
  };

  const getOrderCertificate = () => {
    try {
      nftContractInstance._methods
        .safeMint()
        .call()
        .then((result) => {
          setTokenID(result);
        });
    } catch (error) {
      //   alert("Please Initialize first! getOrderCertificate");
      console.error("Error calling getOrderCertificate:", error);
    }
  };

  const verifyUser = async () => {
    try {
      const isValid = nftContractInstance._methods
        .ownerOf(tokenID)
        .call()
        .then((result) => {
          return true;
          console.log(result);
        })
        .catch((error) => {
          return false;
        });
      return isValid;
    } catch (error) {
      return false;
      //   alert("Please Initialize first! getOrderCertificate");
      console.error("Error calling getOrderCertificate:", error);
    }
  };

  const getAllMaterialStocks = async () => {
    try {
      const isValid = true; //verifyUser();
      if (isValid) {
        const result = await contractInstance._methods
          .getAllMaterialStocks()
          .call();
        console.log(result);

        setMaterialStock(result);
      } else {
        alert("You are not authorized to access this information");
      }
    } catch (error) {
      alert("You are not authorized to access this information");

      //   alert("Please Initialize first! getAllMaterialStocks");
      initialize();
      console.error("Error calling getAllMaterialStocks:", error);
    }
  };

  const getCertifiedProducts = async () => {
    try {
      const isValid = true; //verifyUser();
      if (isValid) {
        const result = await contractInstance._methods
          .getAllCertifiedProductCounts()
          .call();
        console.log(result);
        setCertifiedProducts(result);
      } else {
        alert("You are not authorized to access this information");
      }
    } catch (error) {
      alert("You are not authorized to access this information");
      initialize();

      //   alert("Please Initialize first! getCertifiedProducts");
      console.error("Error calling getCertifiedProducts:", error);
    }
  };

  const simulateConsumption = async (index) => {
    try {
      const isValid = true; //verifyUser();
      if (isValid) {
        await contractInstance._methods
          .simulateConsumption(index, counts[index])
          .send({ from: props.fromAddress });
        console.log("Value set successfully!");
      } else {
        alert("You are not authorized to access this information");
      }
    } catch (error) {
      alert("You are not authorized to access this information");
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
        <button className="button" onClick={getOrderCertificate}>
          Get Your Ticket to Order
        </button>
      </header>

      <div className="container">
        {[
          {
            machineName: "Apple mix",
            products: ["Pineapple", "Bananna", "Apple"],
          },
          {
            machineName: "Good Morning Sunrise Mix",
            products: ["Pineapple", "Apple", "Orange"],
          },
          {
            machineName: "Tropical mix",
            products: ["Pineapple", "Orange", "Bananna"],
          },
          {
            machineName: "Classic Mix",
            products: ["Bananna", "Apple", "Orange"],
          },
        ].map((machine, index) => (
          <div>
            <div className="machine" key={index}>
              <h2>Machine {machine.machineName}</h2>
              <button className="button" onClick={() => handleDecrement(index)}>
                -
              </button>
              <button
                className="button count-button"
                onClick={() => simulateConsumption(index)}
              >
                {counts[index]}
              </button>
              <button className="button" onClick={() => handleIncrement(index)}>
                +
              </button>
              {/* <h3>Products: {certifiedProducts[index]}</h3> */}
            </div>
            <div className="products">
              <h4 style={{ margin: "10px" }}>Products</h4>
              {machine.products.map((product, index) => (
                <div className="product" key={index}>
                  {product}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="stockAndProductContent">
        <div className="stock-section">
          <h2>History of used Materials</h2>
          <button className="button" onClick={getAllMaterialStocks}>
            Get Material History
          </button>
          <div id="stock" className="stock">
            <VerticalBarChart data={materialStock}></VerticalBarChart>
          </div>
        </div>

        <div className="statistics-section">
          <h2>History of produced Products</h2>
          <button className="button" onClick={getCertifiedProducts}>
            Get Products History
          </button>
          <div id="statistics" className="statistics">
            {[
              {
                machineName: "Apple mix",
                products: ["Pineapple", "Bananna", "Apple"],
              },
              {
                machineName: "Good Morning Sunrise Mix",
                products: ["Pineapple", "Apple", "Orange"],
              },
              {
                machineName: "Tropical mix",
                products: ["Pineapple", "Orange", "Bananna"],
              },
              {
                machineName: "Classic Mix",
                products: ["Bananna", "Apple", "Orange"],
              },
              { machineName: 5 },
            ].map((machine, index) => (
              <div className="machineStat" key={index}>
                <h2 style={{ width: 300 }}>
                  {machine.machineName === 5
                    ? `Total Production Count`
                    : `Machine ${index + 1} (${machine.machineName})`}
                </h2>
                <button
                  style={{ width: 300, cursor: "default" }}
                  className="button"
                >
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
