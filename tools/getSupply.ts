import type { ToolConfig } from "./allTools.js";
import {createSVMPublicClient} from "../src/solanajs/createSVMPublicClient";

import type { GetWalletAddressArgs } from "../interface/index.js";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

/**
 * Get the supply for SOL
 *
 */
export const getTotalSupply: ToolConfig<GetWalletAddressArgs> = {
  definition: {
    type: "function",
    function: {
      name: "get_solsupply",
      description: "Get the total and circulating supply for SOL",
      parameters: {
        type: "object",
        properties: {
        },
        required: [],
      },
    },
  },
  handler: async () => {
    return await getTotalSupplyForSOL();
  },
};

async function getTotalSupplyForSOL() {
  const connection = createSVMPublicClient();
  const supply = await connection.getSupply()
  return `Total supply is ${supply.value.total / LAMPORTS_PER_SOL}, and circulating supply is ${supply.value.circulating / LAMPORTS_PER_SOL}`
}
