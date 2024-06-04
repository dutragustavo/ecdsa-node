import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils'


function Wallet({ address, setAddress, balance, setBalance, signature, setSignature }) {
  async function onChange(evt) {
    const signature = evt.target.value;
    setSignature(signature);
    // signature here is actually the private key (for now)
    const address =  toHex(secp.secp256k1.getPublicKey(signature))
    setAddress(address)
    if (signature) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature
        <input placeholder="Paste here the signature of your transaction" value={signature} onChange={onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
