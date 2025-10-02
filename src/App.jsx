import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import VaultDeposit from "./components/VaultDeposit";
import VaultStats from "./components/VaultStats";

const vaultAddress = "0xYourVaultContractAddress"; // replace with deployed contract
const cUSDAddress = "0x765DE816845861e75A25fCA122bb6898B8B1282a"; // Celo mainnet cUSD

export default function App() {
  const [wallet, setWallet] = useState("");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>CeloQuantumVault</h1>
      <WalletConnect onConnect={setWallet} />
      {wallet && <VaultDeposit wallet={wallet} vaultAddress={vaultAddress} cUSDAddress={cUSDAddress} />}
      <VaultStats vaultAddress={vaultAddress} cUSDAddress={cUSDAddress} />
    </div>
  );
}
