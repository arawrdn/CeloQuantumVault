import React, { useState } from "react";
import Web3 from "web3";

export default function VaultDeposit({ wallet, vaultAddress, cUSDAddress }) {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    if (!wallet || !amount) return;
    const web3 = new Web3(window.ethereum);
    const cUSD = new web3.eth.Contract(
      [
        { constant: false, inputs: [{name:"_spender", type:"address"}, {name:"_value", type:"uint256"}], name:"approve", outputs:[{name:"success", type:"bool"}], type:"function" },
        { constant: false, inputs: [{name:"_to", type:"address"}, {name:"_value", type:"uint256"}], name:"transfer", outputs:[{name:"success", type:"bool"}], type:"function" }
      ],
      cUSDAddress
    );
    const amountWei = web3.utils.toWei(amount, "ether");
    await cUSD.methods.approve(vaultAddress, amountWei).send({ from: wallet });
    alert("Deposit approved. Call smart contract to deposit next.");
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <input
        type="number"
        placeholder="Amount in cUSD"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "200px", padding: "5px" }}
      />
      <button onClick={handleDeposit} style={{ marginLeft: "10px", padding: "5px 10px" }}>
        Approve Deposit
      </button>
    </div>
  );
}
