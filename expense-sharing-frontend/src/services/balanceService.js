import api from "./api";

/**
 * ===============================
 * BALANCE APIS
 * ===============================
 */

// 🔹 All active (net) balances for logged-in user
export const getUserBalances = (userId) =>
  api.get(`/balances/user/${userId}`);

// 🔹 Lifetime + Net summary (immutable + mutable)
export const getBalanceOverview = (userId) =>
  api.get(`/balances/user/${userId}/overview`);


// 🔹 Settle a due (only affects Balance table, NOT history)
export const settleBalance = (payload) =>
  api.post("/balances/settle", payload);
