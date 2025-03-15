import { Connection } from "@solana/web3.js";


/**
 * Creates a new client connected to the SVM network.
 *
 * A public client is a client that is not connected to a specific wallet and
 * therefore cannot perform write operations.
 *
 * @returns A new public SVM client.
 */
export function createSVMPublicClient() {
  if (!process.env.SVM_ENDPOINT) {
    throw new Error(
      "⛔ SVM_ENDPOINT environment variable is not set. You need to set it to create a SVM client."
    );
  }

  const connection = new Connection(process.env.SVM_ENDPOINT);
  return connection;
}
