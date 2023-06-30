# SupplyManagement Contract

The `SupplyManagement` contract is a Solidity smart contract that manages the supply chain and tracks the consumption of materials in a manufacturing process. It allows simulating material consumption, adding materials to the stock, and retrieving information about the stock, certified products, and material consumption history.

## Structures

### Machine

The `Machine` struct represents a machine used in the manufacturing process. It has a single field:

- `materials`: An array of strings representing the materials required by the machine.

### CertifiedProduct

The `CertifiedProduct` struct represents a certified product produced by the manufacturing process. It contains the following fields:

- `timestamp`: A timestamp indicating the time of product certification.
- `materials`: An array of strings representing the materials used in the product.
- `materialQuantities`: An array of integers representing the quantities of each material used in the product.
- `productNumber`: A unique identifier for the certified product.

### MaterialConsumption

The `MaterialConsumption` struct tracks the consumption of a material. It includes the following fields:

- `timestamp`: A timestamp indicating the time of material consumption.
- `material`: A string representing the consumed material.
- `quantity`: An integer indicating the quantity of the material consumed.

## Mappings

The contract uses several mappings to store and retrieve data efficiently:

- `materialConsumptions`: A mapping from a material (string) to an array of `MaterialConsumption` structs. It tracks the consumption history of materials.
- `machines`: A mapping from a machine ID (uint) to a `Machine` struct. It stores the machine details, including the required materials.
- `materialStock`: A mapping from a material (string) to an integer representing the current stock quantity of that material.
- `certifiedProducts`: A mapping from a machine ID (uint) to an array of `CertifiedProduct` structs. It stores the certified products produced by each machine.

## Variables

- `totalProductCount`: A public variable that keeps track of the total number of manufactured products.
- `materialTypes`: A public array of strings representing the available types of materials.
- `reorderThreshold`: A constant integer indicating the minimum stock quantity at which material reorder is triggered.
- `reorderQuantity`: A constant integer representing the quantity of material to reorder when the stock falls below the reorder threshold.

## Constructor

The constructor initializes the contract by setting up the initial materials for each machine and populating the material stock. The initial material configurations for the machines and the initial stock quantities are predefined.

## Functions

The contract provides the following functions to interact with and query the data:

- `addMaterial(string memory material, uint quantity)`: Adds the specified quantity of a material to the stock.
- `simulateConsumption(uint machineId, uint productionQuantity)`: Simulates the consumption of materials by a machine during the production of a certain quantity of products. It updates the material stock, records the consumption history, and generates certified products.
- `random(uint number)`: Generates a pseudo-random number based on the current timestamp, previous random number, and the caller's address.
- `getAllMaterialStocks()`: Retrieves an array of the current stock quantities for all available materials.
- `getAllCertifiedProductCounts()`: Retrieves an array of the counts of certified products for each machine.
- `getMaterialConsumptionHistory(string memory material)`: Retrieves an array of `MaterialConsumption` structs representing the consumption history of the specified material.
- `getCertifiedProducts(uint machineId)`: Retrieves an array of `CertifiedProduct` structs representing the certified products produced by the specified machine.

## License

This contract is released under the MIT License. Please refer to the [LICENSE](LICENSE) file for more details.

# ReactJS Contract Interaction

This is a ReactJS code snippet that interacts with a smart contract using the Web3 library. It provides a user interface to simulate the production of products and display information about material stock and production history.

## Prerequisites

To run this application, you need to have the following:

- MetaMask or a Web3-enabled browser installed.
- An Ethereum provider with an active Ethereum account.
- The contract address for the smart contract you want to interact with.

## Setup

1. Install the required dependencies by running the following command:

   ```bash
   npm install web3
   ```

2. Import the necessary libraries:
   ```
   import React, { useState, useEffect } from "react";
   import Web3 from "web3";
   import VerticalBarChart from "./verticalBarChart";
   ```
3. Define the contract ABI (Application Binary Interface):
   ```
   const contractABI = [
     // Contract ABI here
   ];
   ```
4. Set the contract address for your smart contract:
   ```
   const contractAddress = "0x945c4B62F920E06cd2921E294c430597dF7128E8"; // Replace with your contract address
   ```

## Contract Interaction Component

The `ContractInteraction` component is the main component that interacts with the smart contract.

## State Variables

The component uses the following state variables:

- `web3`: Represents the Web3 instance.
- `contractInstance`: Represents the contract instance.
- `materialStock`: Stores the material stock information.
- `certifiedProducts`: Stores the production history information.
- `counts`: An array that keeps track of the production counts for each machine.

## Initialization

The `initialize` function initializes the Web3 and contract instances. It checks if the user has MetaMask or a Web3-enabled browser installed and then sets up the instances accordingly.

## Contract Interaction Functions

The component provides several functions to interact with the smart contract:

- `getAllMaterialStocks`: Retrieves the current stock quantities of all materials from the smart contract.
- `getCertifiedProducts`: Retrieves the production history of each machine from the smart contract.
- `simulateConsumption`: Simulates the consumption of materials by a machine during the production process.

## User Interface

The component renders a user interface that allows the user to simulate the production of products and view material stock and production history.

-The user can increment or decrement the production count for each machine.
-Clicking the "Simulate Production" button triggers the `simulateConsumption` function and updates the production counts, certified products, and material stock.
-The "Get Material Stock" button fetches the current stock quantities of all materials from the smart contract and displays them using a vertical bar chart.
-The "Get History" button retrieves the production history of each machine from the smart contract and displays the number of certified products for each machine.

## Usage

To use this code, follow these steps:

- Install the required dependencies using the command mentioned in the setup.
- Replace the `contractABI` variable with the ABI of your smart contract.
- Set the `contractAddress` variable to the address of your deployed smart contract.
- Run your ReactJS application.

Please note that you need to have a properly deployed smart contract at the specified address with the corresponding ABI for the interaction to work correctly.

## Conclusion

This README provides an overview of a ReactJS code snippet that interacts with a smart contract using the Web3 library. It explains the setup, contract interaction component, functions, and user interface. Follow the provided instructions to use this code in your project and adapt it to your specific requirements.

Further details can be found in the SmartContract OneDrive Folder at https://fhstp-my.sharepoint.com/:f:/g/personal/se191006_fhstp_ac_at/EjkyddJ5UItCkg6Gp_o-hjUBaJ2s-XzJbLstOwoZ5QM4gQ?e=8AgSzZ

Here you can find a short explanation video: https://youtu.be/3C3r2UszCXw

<!-- # Web3 - Infura example

This repo contains the code from the published guide by Infura on describing building Dapp Frontends with React and Network.js

## Description

Building a dapp frontend, using React & Network.js, that can connect and request data from the Ethereum mainnet using Infura & Metamask

## How to run

```
cd client
npm start
```

### Source

https://blog.infura.io/dapp-frontend-network/?utm_campaign=Infura&utm_content=122991049&utm_medium=social&utm_source=linkedin&hss_channel=lcp-9373737 -->
