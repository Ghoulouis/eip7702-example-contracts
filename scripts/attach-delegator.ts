import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { eip7702Actions } from "viem/experimental";
import dotenv from "dotenv";
dotenv.config();

const SEPOLIA_RPC = process.env.SEPOLIA_URL!;

const account = privateKeyToAccount(process.env.PK1! as `0x${string}`);

const account2 = privateKeyToAccount(process.env.PK2! as `0x${string}`);

const IMPLEMENTATION_ADDRESS = "0xcB5494720E9CAe2b184d9C24300405b1132d8D1D";

const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(SEPOLIA_RPC),
}).extend(eip7702Actions);

const walletClient2 = createWalletClient({
  account: account2,
  chain: sepolia,
  transport: http(SEPOLIA_RPC),
}).extend(eip7702Actions);

async function sendSelfExecutingTx() {
  try {
    const authorization = await walletClient.signAuthorization({
      contractAddress: IMPLEMENTATION_ADDRESS,
      executor: "self",
    });

    console.log("authorization", authorization);

    const txhHash = await walletClient.sendTransaction({
      to: walletClient.account.address,
      authorizationList: [authorization],
    });

    console.log(`txhHash: ${txhHash}`);
  } catch (error) {
    console.log(error);
  }
}

sendSelfExecutingTx();
