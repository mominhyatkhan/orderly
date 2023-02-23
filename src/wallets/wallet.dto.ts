export interface WalletDto {
  address: string;
  chain: string;
  istelegram: boolean;
  isemail: boolean;
  email: string;
}
export interface createWallet {
  address: string;
  chain: string;
  email: string;
}
export interface emailNotification {
  address: string;
  chain: string;
  isemail: boolean;
  email: string;
}
export interface telegramNotification {
  address: string;
  chain: string;
  istelegram: boolean;
  email: string;
}
