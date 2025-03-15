// Importing necessary functions and types for transaction handling
import { createSVMPublicClient } from "../src/solanajs/createSVMPublicClient"; 
import { createSVMWalletClient } from "../src/solanajs/createSVMWalletClient"; 
import type { ToolConfig } from "./allTools.js"; // Type definition for tool configurations
import type { SendTransactionArgs } from "../interface/index.js"; // Type definition for send transaction arguments
import {
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

// Configuration for the send transaction tool
export const sendTransactionTool: ToolConfig<SendTransactionArgs> = {
  definition: {
    type: "function",
    function: {
      name: "send_transaction",
      description: "Send a transaction with optional parameters",
      parameters: {
        type: "object",
        properties: {
          to: {
            type: "string",
            description: "The recipient address",
          },
          value: {
            type: "string",
            description: "The amount of SOL to send (in SOL, not lamport)",
          },
          token: {
            type: "string",
            description: "The token to send",
            optional: true,
          },
        },
        required: ["to","value"],
      },
    },
  },
  // Handler function to execute the send transaction tool
  handler: async (args) => {
    const result = await sendTransaction(args.to, args.value, args.token);
    if (!result.success || !result.hash) throw new Error(result.message);
    return result.hash;
  },
};

// Function to send a transaction
async function sendTransaction(to:string, value:string, token?:string ) {
  try {
    // Creating a Viem wallet client instance
    const connection = createSVMPublicClient();
    const wallet = createSVMWalletClient();

    const lamportsToSend = Number(value) * LAMPORTS_PER_SOL;

    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: lamportsToSend,
      }),
    );
    
    const hash = await sendAndConfirmTransaction(connection, transferTransaction, [wallet]);

    // Returning the transaction hash and a success message
    return {
      success: true,
      hash,
      message: `Transaction sent successfully. Hash: ${hash}`,
    };
  } catch (error) {
    // Handling errors and returning an error message
    return {
      success: false,
      hash: null,
      message: `Failed to send transaction: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    };
  }
}
