# Developing a Blockchain-based-eVault-for-legal-records
## Overview
The Blockchain Based E-Vault System is a cutting-edge platform that capitalizes on blockchain technology's decentralized nature, particularly leveraging Ethereum's blockchain. Its primary objective is to provide a secure and decentralized system for uploading, storing, and sharing images. By integrating the InterPlanetary File System (IPFS), the project ensures images are stored in a distributed manner, offering immutability and robustness against data tampering.

The core functionality revolves around using Solidity smart contracts within the Ethereum blockchain. These smart contracts facilitate ownership management and access control over the uploaded images. Users can securely upload their images to the IPFS network and specify access permissions through smart contract functionality, allowing or revoking access to specific individuals.
## Features

- Decentralized Storage: Utilizes IPFS (InterPlanetary File System) for decentralized and immutable storage of legal records.
- Smart Contracts: Implements Solidity smart contracts on the Ethereum blockchain for access control and ownership management.
- Access Control: Enables users to grant or revoke access to their uploaded records through smart contracts.


## Technologies Used

1.	Solidity: Back-end Smart contract development for ownership and access control 
2.	React: Front-end interface for uploading images and managing access.
3.	IPFS: Decentralized storage protocol for hosting uploaded images (pinata)
4.	Hardhat: Hardhat is a development environment for Ethereum software.
5.	Ether.js: A complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.
6.	Meta Mask: It is cryptocurrency wallet.
## Installation

1. Install the dependencies:
- Hardhat
```bash
npm install save-dev hardhat@2.12.4
```
- React App
```bash
npm install create-react-app
```

2. Run the app:
- For run the React
```bash
npm start
```
- For run the Blockchain
```bash
npx hardhat node
```




    
## Setup and Usage
- Installation: Clone the repository and install necessary dependencies using npm install.
- Configuration: Set up environment variables, obtain API keys for Pinata, and update React components with Pinata API keys.
- Running the Application: Start the React application using npm start. Ensure MetaMask is installed and configured for Ethereum interactions.
- Interacting with the System: Follow the instructions in the application to upload records, manage access, and utilize MetaMask for Ethereum transactions.
## Contributors
S.KAJALAKSHMI
P.SHRUTHI