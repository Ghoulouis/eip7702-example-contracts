import { createWalletClient, http, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { eip7702Actions } from "viem/experimental";
import dotenv from "dotenv";
import { BatchExecutor__factory, ERC20Mintable__factory, Vault__factory } from "../typechain-types";
dotenv.config();

const SEPOLIA_RPC = process.env.SEPOLIA_URL!;

const account = privateKeyToAccount(process.env.PK1! as `0x${string}`);

const IMPLEMENTATION_ADDRESS = "0xcB5494720E9CAe2b184d9C24300405b1132d8D1D";

async function getData() {
  let token = ERC20Mintable__factory.connect("0xF04C04AF7fF76BAf096ddB18B3Cd453a7B2fEf04");

  let vault = Vault__factory.connect("0x6E33FD6dD5aD776A218e3CB4ddaB6E8868f2eEfD");

  let amount = parseUnits("10", 6);

  let approveTx = await token.approve.populateTransaction(await vault.getAddress(), amount);

  let depositTx = await vault.deposit.populateTransaction(amount);

  let data = [
    {
      to: approveTx.to,
      value: 0,
      data: approveTx.data,
    },
    {
      to: depositTx.to,
      value: 0,
      data: depositTx.data,
    },
  ];

  let multicall = BatchExecutor__factory.connect("0xcB5494720E9CAe2b184d9C24300405b1132d8D1D");

  let data2 = await multicall.execute.populateTransaction(data);

  return data2;
}

const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(SEPOLIA_RPC),
}).extend(eip7702Actions);

async function sentBatch() {
  try {
    const authorization = await walletClient.signAuthorization({
      contractAddress: IMPLEMENTATION_ADDRESS,
      executor: "self",
    });

    console.log("authorization", authorization);

    let data = await getData();

    console.log(data);
    const txhHash = await walletClient.sendTransaction({
      to: walletClient.account.address,
      data: data.data as `0x${string}`,
      authorizationList: [authorization],
    });
    console.log(`txhHash: ${txhHash}`);
  } catch (error) {
    console.log(error);
  }
}

sentBatch();
