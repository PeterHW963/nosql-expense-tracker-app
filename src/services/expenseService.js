/**
 * TEMPORARY FRONTEND-ONLY STUB SERVICE
 *
 * This file currently uses in-memory mock data so the UI can be built
 * before connecting to a real backend.
 *
 * Later:
 * - Firestore branch:
 *   replace these functions with Firestore CRUD + onSnapshot
 * - MongoDB branch:
 *   replace these functions with REST API calls
 *
 * Nothing in this file writes to a real database yet.
 */
import { db } from "../config/firebase";

const EXPENSES_COLLECTION = "expenses";

// -----------------------------------------------------------------------------
// STUB READ ALL
// -----------------------------------------------------------------------------
// - Firestore branch: query Firestore collection/documents
// - MongoDB branch: fetch from REST API endpoint like GET /expenses

export const listExpenses = async () => {
  return [...expenses].sort((a, b) => b.date.localeCompare(a.date));
};

// -----------------------------------------------------------------------------
// STUB CREATE EXPENSE
// -----------------------------------------------------------------------------
// - Firestore branch: addDoc(...)
// - MongoDB branch: REST API endpoint POST /expenses

export const createExpense = async (expenseData) => {
  const newExpense = {
    ...expenseData,
    id: crypto.randomUUID(),
    amount: Number(expenseData.amount),
  };

  expenses = [newExpense, ...expenses];
  return newExpense;
};

// -----------------------------------------------------------------------------
// STUB: UPDATE EXPENSE
// -----------------------------------------------------------------------------
// - Firestore branch: updateDoc(...)
// - MongoDB branch: REST API endpoint PUT /expenses/:id

export const updateExpense = async (id, updatedData) => {
  expenses = expenses.map((expense) =>
    expense.id === id
      ? {
          ...expense,
          ...updatedData,
          amount: Number(updatedData.amount),
        }
      : expense,
  );
};

// -----------------------------------------------------------------------------
// STUB: DELETE EXPENSE
// -----------------------------------------------------------------------------
// - Firestore branch: deleteDoc(...)
// - MongoDB branch: REST API endpoint DELETE /expenses/:id

export const deleteExpense = async (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
};

// -----------------------------------------------------------------------------
// STUB: REALTIME SUBSCRIPTION
// -----------------------------------------------------------------------------
// - Firestore branch: use onSnapshot(...)
// - MongoDB branch: remove
// Must return an unsubscribe function so App.jsx can clean it up.

export const subscribeToExpenses = () => {
  // TO IMPLEMENT
};
