import type { Transaction } from "@/types/transaction";
import { getTransactionSignedAmount } from "./balance";

export type TransactionDayGroup = {
  date: string;
  netAmount: number;
  transactions: Transaction[];
};

export function groupTransactionsByDate(
  transactions: Transaction[],
): TransactionDayGroup[] {
  const groups = new Map<string, TransactionDayGroup>();

  for (const transaction of transactions) {
    const date = transaction.transactionDate.slice(0, 10);

    const existingGroup = groups.get(date);

    if (existingGroup) {
      existingGroup.transactions.push(transaction);
      existingGroup.netAmount += getTransactionSignedAmount(transaction);
    } else {
      groups.set(date, {
        date,
        netAmount: getTransactionSignedAmount(transaction),
        transactions: [transaction],
      });
    }
  }

  return Array.from(groups.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
