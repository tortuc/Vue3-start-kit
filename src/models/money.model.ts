export interface CurrencyValue {
  value: number;
  currency: Currency;
}

export enum Currency {
  USD = 'USD',
  PLN = 'PLN',
  EUR = 'EUR',
  BTC = 'BTC'
}