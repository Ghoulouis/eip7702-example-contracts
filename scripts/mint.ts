import { parseUnits } from "ethers";
import hre from "hardhat";
import { ERC20Mintable__factory } from "../typechain-types";

async function mint() {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy, get } = deployments;

  let amount = parseUnits("1000", 6);

  let test = await get("TEST");

  let wallet = new hre.ethers.Wallet(process.env.PK1!, hre.ethers.provider);

  let testContract = ERC20Mintable__factory.connect(test.address, wallet);
  let tx = await testContract.mint(wallet.address, amount);
  let response = await tx.wait();
  console.log(response);
}
mint();
