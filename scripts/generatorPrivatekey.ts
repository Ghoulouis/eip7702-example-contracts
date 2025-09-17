import { Wallet } from "ethers";

async function generatorPrivateKey() {
  let wallet = Wallet.createRandom();
  console.log(`address: ${wallet.address}`);
  console.log(`privateKey: ${wallet.privateKey}`);
}
generatorPrivateKey();
