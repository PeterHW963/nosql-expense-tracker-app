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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// -----------------------------------------------------------------------------
// STUB READ ALL
// -----------------------------------------------------------------------------
// - Firestore branch: query Firestore collection/documents
// - MongoDB branch: fetch from REST API endpoint like GET /expenses

export const listExpenses = async () => {
  const response = await fetch(`${API_BASE_URL}/expenses`);
  const data = response.json();
  if (!response.ok) {
    console.error(data.message);
  }
  return data;
};

// -----------------------------------------------------------------------------
// STUB CREATE EXPENSE
// -----------------------------------------------------------------------------
// - Firestore branch: addDoc(...)
// - MongoDB branch: REST API endpoint POST /expenses

export const createExpense = async (expenseData) => {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // u need this to tell API that the body of req is JSON
    },
    body: JSON.stringify(expenseData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data.message);
  }

  return data;
};

// -----------------------------------------------------------------------------
// STUB: UPDATE EXPENSE
// -----------------------------------------------------------------------------
// - Firestore branch: updateDoc(...)
// - MongoDB branch: REST API endpoint PUT /expenses/:id

export const updateExpense = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data.message);
  }
  return data;
};

// -----------------------------------------------------------------------------
// STUB: DELETE EXPENSE
// -----------------------------------------------------------------------------
// - Firestore branch: deleteDoc(...)
// - MongoDB branch: REST API endpoint DELETE /expenses/:id

export const deleteExpense = async (id) => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  const data = response.json();
  if (!response.ok) {
    console.error(data.message);
  }
  return data;
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
