export interface CreditCard {
  id: string;
  last4: string;
  cardType: 'visa' | 'mastercard' | 'amex';
  bankName: string;
  cardHolder: string;
  expiry: string;
  outstanding: number;
  dueDate: string;
  limit: number;
  bgColor: string;
}

export interface Transaction {
  id: string;
  cardId: string;
  merchant: string;
  amount: number;
  date: string;
  category: 'Food' | 'Shopping' | 'Travel' | 'Bills' | 'Entertainment' | 'Other';
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  cibilScore: number;
}
