
export interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  currency: string;
  merchant: string;
  category: string;
  deviceId: string;
  location: string;
  previousUses: number;
  riskScore: number;
  originalStatus: 'approved' | 'blocked';
  currentStatus: 'approved' | 'blocked';
  overrideReason: string | null;
}

export const mockTransactions: Transaction[] = [
  {
    id: "tx-001",
    timestamp: "2025-04-12T09:23:41",
    amount: 299.99,
    currency: "USD",
    merchant: "Apple Store",
    category: "Electronics",
    deviceId: "iphone-12-pro-8a72b",
    location: "São Paulo, Brazil",
    previousUses: 12,
    riskScore: 15, // Low risk
    originalStatus: "blocked",
    currentStatus: "approved",
    overrideReason: "Dispositivo confiável usado em 12 compras anteriores"
  },
  {
    id: "tx-002",
    timestamp: "2025-04-12T10:45:32",
    amount: 74.50,
    currency: "USD",
    merchant: "Steam",
    category: "Entertainment",
    deviceId: "macbook-pro-9c24e",
    location: "Rio de Janeiro, Brazil",
    previousUses: 8,
    riskScore: 22, // Low risk
    originalStatus: "blocked",
    currentStatus: "approved",
    overrideReason: "Localização e dispositivo reconhecidos de 8 transações anteriores"
  },
  {
    id: "tx-003",
    timestamp: "2025-04-12T12:05:19",
    amount: 1299.00,
    currency: "USD",
    merchant: "Dell Technologies",
    category: "Electronics",
    deviceId: "windows-pc-3e5f1",
    location: "Brasília, Brazil",
    previousUses: 2,
    riskScore: 60, // Medium risk
    originalStatus: "blocked",
    currentStatus: "blocked",
    overrideReason: null
  },
  {
    id: "tx-004",
    timestamp: "2025-04-12T13:18:56",
    amount: 49.99,
    currency: "USD",
    merchant: "Netflix",
    category: "Entertainment",
    deviceId: "iphone-12-pro-8a72b",
    location: "São Paulo, Brazil",
    previousUses: 13,
    riskScore: 12, // Low risk
    originalStatus: "blocked",
    currentStatus: "approved",
    overrideReason: "Assinatura recorrente em dispositivo confiável"
  },
  {
    id: "tx-005",
    timestamp: "2025-04-12T14:33:10",
    amount: 159.95,
    currency: "USD",
    merchant: "Amazon",
    category: "Retail",
    deviceId: "unknown-device-1f3a7",
    location: "Fortaleza, Brazil",
    previousUses: 0,
    riskScore: 85, // High risk
    originalStatus: "blocked",
    currentStatus: "blocked",
    overrideReason: null
  },
  {
    id: "tx-006",
    timestamp: "2025-04-12T15:42:27",
    amount: 25.00,
    currency: "USD",
    merchant: "Uber",
    category: "Transportation",
    deviceId: "iphone-12-pro-8a72b",
    location: "São Paulo, Brazil",
    previousUses: 14,
    riskScore: 10, // Very low risk
    originalStatus: "blocked",
    currentStatus: "approved",
    overrideReason: "Localização consistente com histórico de uso"
  },
  {
    id: "tx-007",
    timestamp: "2025-04-12T16:59:48",
    amount: 349.99,
    currency: "USD",
    merchant: "Best Buy",
    category: "Electronics",
    deviceId: "macbook-pro-9c24e",
    location: "Rio de Janeiro, Brazil",
    previousUses: 9,
    riskScore: 25, // Low risk
    originalStatus: "blocked",
    currentStatus: "approved",
    overrideReason: "Valor consistente com histórico de compras anteriores"
  },
  {
    id: "tx-008",
    timestamp: "2025-04-12T18:12:33",
    amount: 1999.00,
    currency: "USD",
    merchant: "Flight Booking",
    category: "Travel",
    deviceId: "windows-pc-3e5f1",
    location: "Brasília, Brazil",
    previousUses: 3,
    riskScore: 72, // High risk
    originalStatus: "blocked",
    currentStatus: "blocked",
    overrideReason: null
  },
  {
    id: "tx-009",
    timestamp: "2025-04-12T19:27:15",
    amount: 12.99,
    currency: "USD",
    merchant: "Spotify",
    category: "Entertainment",
    deviceId: "iphone-12-pro-8a72b",
    location: "São Paulo, Brazil",
    previousUses: 15,
    riskScore: 8, // Very low risk
    originalStatus: "blocked",
    currentStatus: "approved",
    overrideReason: "Assinatura recorrente em dispositivo confiável"
  },
  {
    id: "tx-010",
    timestamp: "2025-04-12T20:44:39",
    amount: 799.50,
    currency: "USD",
    merchant: "Booking.com",
    category: "Travel",
    deviceId: "unknown-device-2d6b8",
    location: "Manaus, Brazil",
    previousUses: 0,
    riskScore: 92, // Very high risk
    originalStatus: "blocked",
    currentStatus: "blocked",
    overrideReason: null
  }
];
