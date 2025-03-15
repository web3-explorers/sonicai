import { Keypair } from "@solana/web3.js";
import { HDKey } from "micro-ed25519-hdkey";
import * as bip39 from "bip39";


/**
 * Creates a new SVM wallet client.
 *
 * A wallet client is a client that is connected to a specific wallet and
 * can therefore perform write operations.
 *
 * @returns A new wallet client.
 */
export function createSVMWalletClient() {
  // Check if the private key environment variable is set
  if (!process.env.SVM_MNEMONIC) {
    throw new Error(
      "⛔ SVM_MNEMONIC environment variable is not set. You need to set it to create a wallet client."
    );
  }
  const seed = bip39.mnemonicToSeedSync(process.env.SVM_MNEMONIC, "");
  const hd = HDKey.fromMasterSeed(seed.toString("hex"));

  const path = `m/44'/501'/0'/0'`;
  const keypair = Keypair.fromSeed(hd.derive(path).privateKey);
  return keypair;
}
