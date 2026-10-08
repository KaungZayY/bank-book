import type { Transaction } from "@/types/transaction";

export type TransactionWithBalance = Transaction & {
  runningBalance: number;
};

export function getTransactionSignedAmount(transaction: Transaction): number {
  if (transaction.direction === "+") {
    return transaction.amount;
  }

  return -transaction.amount;
}

export function calculateBalance(transactions: Transaction[]): number {
  return transactions.reduce(
    (balance, transaction) => balance + getTransactionSignedAmount(transaction),
    0,
  );
}

export function calculateRunningBalance(
  transactions: Transaction[],
): TransactionWithBalance[] {
  let balance = 0;

  const chronologicalTransactions = [...transactions].sort(
    (a, b) =>
      new Date(a.transactionDate).getTime() -
      new Date(b.transactionDate).getTime(),
  );

  return chronologicalTransactions.map((transaction) => {
    balance += getTransactionSignedAmount(transaction);

    return {
      ...transaction,
      runningBalance: balance,
    };
  });
}
