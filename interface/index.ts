/**
 * Arguments for the get_balance tool
 */
export interface GetBalanceArgs {
  /**
   * The wallet to get the balance of
   */
  wallet: string;
}

// No arguments needed since we're getting the connected wallet
export interface GetWalletAddressArgs {}

export interface SendTransactionArgs {
  /**
   * The recipient address
   */
  to: string;
  /**
   * The amount of SOL to send (in SOL, not lamport)
   */
  value: string;
  /**
   * Token to send (if not SOL)
   */
  token?: string;
}
