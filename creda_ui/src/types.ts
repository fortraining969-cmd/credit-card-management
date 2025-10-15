// src/types.ts
export type CreditCard = {
  id: string;
  bankName: string;
  cardHolder: string;
  last4: string;
  expiry: string;
  outstanding?: number;
  limit?: number;
  cardType?: string;
  bgColor?: string;
  nickname?: string;
  blocked?: boolean;
};

export type Transaction = {
  id: string;
  cardId: string;
  merchant: string;
  amount: number;
  date: string;
  type?: string;
};

export type UserProfile = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  cibilScore?: number;
};
