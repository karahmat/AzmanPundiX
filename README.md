# ERC721 and ERC20 Smart Contracts

## Introduction

This repository is a simple React application that implements ERC721 and ERC20 smart contracts

## ERC721 Smart Contract

The Solidity file is here ```text /src/contracts/Azman.sol ```. It creates a non-fungible token called Azman (KAZ) (i.e., my name). Each KAZ has a unique token ID and has the following features:

- Autoincrement of the token ID every time a new KAZ is created
- mint function
- pause function (to pause the smart contract) (Note: not implemented in the UI)
- burn function

## ERC20 Smart Contract

The Solidity file is here ```text /src/contracts/Khairul.sol ```. It creates a fungible token called Khairul (KHA) (i.e., my name). The smart contract creates an initial supply of 100,000 KHA. The total number of KHA should be capped at 1,000,000. The user interface only allows the user to mint new KHA. 


