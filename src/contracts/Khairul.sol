// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Khairul is ERC20Capped, Ownable {
    constructor() ERC20("Khairul", "KHA") ERC20Capped(1000000) {
        ERC20._mint(msg.sender, 100000);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        ERC20._mint(to, amount);
    }
}