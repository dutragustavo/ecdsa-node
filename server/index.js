const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0354a60cc6800995a8d86389f1b28f6e3b1ecbd56ad74f8cc3e91911368694f878": 100,
  "028ed4bb76fd2bca7511d9da26c0a1d1b7ebb3d76d78e1369a04e3c0adaa392b33": 50,
  "03ad864a7b905bb47fb631ed7aee0be58e500a1774dc0dc60e7b472912979eeb00": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client
  // recover the pub key from the signature
  // bonus -> use ethereum addresses

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
