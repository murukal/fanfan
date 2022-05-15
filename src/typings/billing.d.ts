export interface Billing {
  id: number;
  name: string;
}

export interface CreateBillingInput extends Pick<Billing, 'name'> {}
