import React, { useEffect, useState } from "react";
import Web3 from "web3";
import QuantumVaultABI from "../contracts/QuantumVault.json"; // placeholder for ABI

export default function VaultStats({ vaultAddress, cUSDAddress }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const web3 = new Web3("https://forno.celo.org"); // mainnet
      const cUSD = new web3.eth.Contract([
        {constant:true, inputs:[{name:"account",type:"address"}], name:"balanceOf", outputs:[{name:"",type:"uint256"}], type:"function"}
      ], cUSDAddress);
      const b = await cUSD.methods.balanceOf(vaultAddress).call();
      setBalance(web3.utils.fromWei(b, "ether"));
    };
    fetchBalance();
  }, [vaultAddress, cUSDAddress]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      Vault Balance: {balance} cUSD
    </div>
  );
}
