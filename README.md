# CeloQuantumVault

## Overview
CeloQuantumVault is a decentralized vault on the **Celo mainnet** where users deposit CELO/cUSD into a pseudo-randomized vault. Rewards are calculated on-chain based on blockhash, timestamp, and deposit amounts. It’s a gamified staking experiment combining chance and strategy.

## Features
- Deposit CELO/cUSD into a mainnet vault
- Pseudo-random reward calculation
- Track vault balance and user deposits
- WalletConnect / Valora integration

## Installation & Run + Future Improvements
```bash
# Clone the repo
git clone https://github.com/yourusername/CeloQuantumVault.git
cd CeloQuantumVault

# Install dependencies
npm install

# Start the development server
npm start
# Open in browser: http://localhost:3000

# Future Improvements:
# - Deploy QuantumVault contract with upgradeable proxy
# - Implement real-time reward claiming on frontend
# - Add CELO deposit option besides cUSD
# - Gamify vault: leaderboard for highest rewards
# - Add automated notifications when rewards are claimable
