import { PythSolanaReceiver } from "@pythnetwork/pyth-solana-receiver";
import { Connection, } from "@solana/web3.js";
import { Wallet } from "@coral-xyz/anchor";
import { SONICSVM_USD_PRICE_FEED} from "../constants/pyth";
import { HermesClient } from "@pythnetwork/hermes-client";


export async function fetchSonicPrice(connection:Connection, wallet:Wallet) {
    const pythSolanaReceiver = new PythSolanaReceiver({ connection, wallet });
 
    const solUsdPriceFeedAccount = pythSolanaReceiver
        .getPriceFeedAccountAddress(0, SONICSVM_USD_PRICE_FEED)
        .toBase58();
    const priceServiceConnection = new HermesClient("https://hermes.pyth.network/",{});
    const lastupdates = await priceServiceConnection.getLatestPriceUpdates(
          [SONICSVM_USD_PRICE_FEED],
          { encoding: "hex" }
        );
    return lastupdates.parsed?.[0].price.price * 10**lastupdates.parsed?.[0].price.expo;
}