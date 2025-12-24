import api from "./api";

export const addExpense = (data, requesterId) =>
  api.post(`/expenses?requesterId=${requesterId}`, data);

export const getExpensesByGroup = (groupId) =>
  api.get(`/expenses/group/${groupId}`);


