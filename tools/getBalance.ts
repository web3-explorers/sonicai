import {
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import type { ToolConfig } from "./allTools.js";
import { createSVMPublicClient} from "../src/solanajs/createSVMPublicClient";
import type { GetBalanceArgs } from "../interface/index.js";

/**
 * Get the balance of a wallet.
 *
 * This tool takes a single parameter, the wallet address to get the balance
 * from.
 */
export const getBalanceTool: ToolConfig<GetBalanceArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_balance",
      description: "Get the balance of a wallet",
      parameters: {
        type: "object",
        properties: {
          wallet: {
            type: "string",
            pattern: "^0x[a-fA-F0-9]{40}$",
            description: "The wallet address to get the balance from",
          },
        },
        required: ["wallet"],
      },
    },
  },
  handler: async ({ wallet }) => {
    return await getBalance(wallet);
  },
};

async function getBalance(wallet: string) {
  const connection = createSVMPublicClient();
  const publicWallet = new PublicKey(wallet);
  const balance = await connection.getBalance(publicWallet);
  return balance / LAMPORTS_PER_SOL;
}
