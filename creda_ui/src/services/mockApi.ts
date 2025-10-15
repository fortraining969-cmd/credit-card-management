// src/services/mockApi.ts
// Mock API service for Creda fintech dashboard
// --------------------------------------------
// This file simulates backend APIs with realistic delay and structure.
// In production, these would be replaced with fetch() or axios() calls
// to your actual backend endpoints.

import { CreditCard, Transaction, UserProfile } from "../types";

// Artificial delay helper
function delay(ms: number = 600) {
  return new Promise((res) => setTimeout(res, ms));
}

// In-memory mock data
let mockProfile: UserProfile = {
  id: "u1",
  firstName: "Arjun",
  lastName: "Kapoor",
  email: "arjun.kapoor@example.com",
  phoneNumber: "9876543210",
  address: "Mumbai, India",
  cibilScore: 764,
};

let mockCards: CreditCard[] = [
  {
    id: "c1",
    bankName: "Axis Bank",
    cardHolder: "Arjun Kapoor",
    last4: "8910",
    expiry: "10/26",
    outstanding: 12499,
    limit: 50000,
    cardType: "VISA",
    bgColor: "bg-gradient-to-br from-blue-500 to-purple-600",
    nickname: "Travel Card",
    blocked: false,
  },
  {
    id: "c2",
    bankName: "HDFC Bank",
    cardHolder: "Arjun Kapoor",
    last4: "1121",
    expiry: "08/25",
    outstanding: 8999,
    limit: 40000,
    cardType: "MASTERCARD",
    bgColor: "bg-gradient-to-br from-green-400 to-teal-500",
    nickname: "Everyday",
    blocked: false,
  },
  {
    id: "c3",
    bankName: "SBI Bank",
    cardHolder: "Arjun Kapoor",
    last4: "5432",
    expiry: "12/27",
    outstanding: 0,
    limit: 60000,
    cardType: "VISA",
    bgColor: "bg-gradient-to-br from-pink-500 to-orange-500",
    nickname: "Shopping",
    blocked: false,
  },
];

let mockTransactions: Transaction[] = [
  { id: "t1", cardId: "c1", merchant: "Amazon", amount: 2599, date: "2025-10-14", type: "Debit" },
  { id: "t2", cardId: "c2", merchant: "PhonePe", amount: 349, date: "2025-10-12", type: "Debit" },
  { id: "t3", cardId: "c1", merchant: "Zomato", amount: 599, date: "2025-10-11", type: "Debit" },
  { id: "t4", cardId: "c3", merchant: "Netflix", amount: 699, date: "2025-10-10", type: "Debit" },
  { id: "t5", cardId: "c2", merchant: "Groceries", amount: 2549, date: "2025-09-29", type: "Debit" },
  { id: "t6", cardId: "c1", merchant: "IRCTC", amount: 1720, date: "2025-09-22", type: "Debit" },
  { id: "t7", cardId: "c3", merchant: "Uber", amount: 399, date: "2025-09-20", type: "Debit" },
  { id: "t8", cardId: "c1", merchant: "Swiggy", amount: 299, date: "2025-09-18", type: "Debit" },
  { id: "t9", cardId: "c2", merchant: "DineOut", amount: 799, date: "2025-09-16", type: "Debit" },
];

// 🧍 USER APIs
export async function fetchProfile(): Promise<UserProfile> {
  await delay();
  return mockProfile;
}

// 💳 CARD APIs
export async function fetchCards(): Promise<CreditCard[]> {
  await delay();
  return mockCards;
}

export async function addCard(card: CreditCard): Promise<CreditCard> {
  await delay();
  mockCards.unshift(card);
  return card;
}

export async function blockCard(cardId: string, blocked: boolean): Promise<CreditCard | null> {
  await delay();
  const card = mockCards.find((c) => c.id === cardId);
  if (card) card.blocked = blocked;
  return card ?? null;
}

export async function updateCardPin(cardId: string, newPin: string): Promise<boolean> {
  await delay(1000);
  console.log(`PIN updated for card ${cardId}: ${newPin}`);
  return true;
}

export async function deleteCard(cardId: string): Promise<boolean> {
  await delay();
  mockCards = mockCards.filter((c) => c.id !== cardId);
  mockTransactions = mockTransactions.filter((t) => t.cardId !== cardId);
  return true;
}

// 🧾 TRANSACTION APIs
export async function fetchTransactions(cardId?: string): Promise<Transaction[]> {
  await delay();
  return cardId ? mockTransactions.filter((t) => t.cardId === cardId) : mockTransactions;
}

export async function addTransaction(txn: Transaction): Promise<Transaction> {
  await delay();
  mockTransactions.unshift(txn);
  return txn;
}

// 💰 PAYMENTS
export async function makePayment(amount: number, payee: string): Promise<string> {
  await delay(800);
  if (!amount || !payee) throw new Error("Invalid payment details");
  const msg = `Paid ₹${amount.toLocaleString("en-IN")} to ${payee}`;
  console.log(msg);
  return msg;
}

// 💬 SUPPORT CHAT MOCK
const botReplies = [
  "I'm here to assist you! You can ask about your cards, payments, or CIBIL score.",
  "To block a card, click 'Block' under Card Details.",
  "PIN change is available under Manage PIN.",
  "You can pay bills in the Payments section.",
  "Your query has been noted. A representative will get back to you soon.",
];

export async function fetchBotReply(userMessage: string): Promise<string> {
  await delay(700);
  const lower = userMessage.toLowerCase();
  if (lower.includes("block")) return "Sure. Go to the card detail and click 'Block Card'.";
  if (lower.includes("pin")) return "You can change your PIN under Manage PIN in card details.";
  if (lower.includes("bill")) return "Navigate to Payments Hub and choose your payee to pay a bill.";
  return botReplies[Math.floor(Math.random() * botReplies.length)];
}

// 🧩 UTILITIES
export async function resetMockData() {
  mockCards.forEach((c) => (c.blocked = false));
  mockTransactions = mockTransactions.slice(0, 10);
}
