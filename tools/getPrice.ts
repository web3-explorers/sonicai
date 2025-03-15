import { createSVMWalletClient } from "../src/solanajs/createSVMWalletClient";
import { createSVMPublicClient } from "../src/solanajs/createSVMPublicClient";
import type { ToolConfig } from "./allTools.js";
import { Wallet} from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";
import type { GetWalletAddressArgs } from "../interface/index.js";
import {fetchSonicPrice} from "../src/pyth/fetchPrice";

/**
 * Gets the price for SonicSVM
 */
export const getPriceSonicSVMTool: ToolConfig<GetWalletAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_price_sonicsvm",
      description: "Get the price in USD for SonicSVM",
      // No parameters needed since we're getting the connected wallet
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  handler: async () => {
    return await getPrice();
  },
};

/**
 * Gets the connected wallet address.
 */
async function getPrice(): Promise<string> {
    const connection = createSVMPublicClient();
    const walletClient = createSVMWalletClient();
    const wallet = new Wallet(Keypair.fromSecretKey(walletClient.secretKey));

    const price = fetchSonicPrice(connection,wallet);
    return price;
}
