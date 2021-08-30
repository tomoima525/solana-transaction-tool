import { Connection, PublicKey, ConfirmedTransaction } from "@solana/web3.js";

export interface TransactionWithSignature {
  signature: string;
  confirmedTransaction: ConfirmedTransaction;
}
export async function getTransactions(
  connection: Connection,
  address: PublicKey
): Promise<Array<TransactionWithSignature>> {
  const transSignatures = await connection.getConfirmedSignaturesForAddress2(
    address
  );

  const transactions = new Array<TransactionWithSignature>();
  for (let i = 0; i < transSignatures.length; i++) {
    const signature = transSignatures[i].signature;
    const confirmedTransaction = await connection.getConfirmedTransaction(
      signature
    );
    if (confirmedTransaction) {
      const transWithSignature = {
        signature,
        confirmedTransaction,
      };
      transactions.push(transWithSignature);
    }
  }
  return transactions;
}
