// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract QuantumVault {
    IERC20 public cUSD;
    address public owner;

    struct Deposit {
        address user;
        uint256 amount;
        uint256 blockNumber;
        bool claimed;
    }

    Deposit[] public deposits;

    constructor(address _cUSD) {
        cUSD = IERC20(_cUSD);
        owner = msg.sender;
    }

    function deposit(uint256 amount) external {
        require(cUSD.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        deposits.push(Deposit(msg.sender, amount, block.number, false));
    }

    function claimReward(uint256 index) external {
        Deposit storage d = deposits[index];
        require(d.user == msg.sender, "Not owner");
        require(!d.claimed, "Already claimed");

        uint256 reward = calculateReward(d.amount, d.blockNumber);
        d.claimed = true;

        require(cUSD.transfer(msg.sender, reward), "Transfer failed");
    }

    function calculateReward(uint256 amount, uint256 depositBlock) public view returns (uint256) {
        // Quantum pseudo-random logic: influenced by blockhash and timestamp
        uint256 randomness = uint256(keccak256(abi.encodePacked(blockhash(depositBlock), block.timestamp, amount)));
        uint256 multiplier = 80 + (randomness % 41); // multiplier between 80% to 120%
        return (amount * multiplier) / 100;
    }

    function vaultBalance() external view returns (uint256) {
        return cUSD.balanceOf(address(this));
    }

    function totalDeposits() external view returns (uint256) {
        return deposits.length;
    }
}
