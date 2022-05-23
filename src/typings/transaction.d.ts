export interface Transaction {
  id: number;
  billingId: number;
  categoryId: number;
  amount: number;
}

export interface CreateTransactionInput
  extends Pick<Transaction, 'billingId' | 'categoryId' | 'amount'> {}

export interface UpdateTransactionInput
  extends Omit<CreateTransactionInput, 'billingId'> {}
