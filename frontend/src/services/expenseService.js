/**
 * MONGODB IMPLEMENTATION
 *
 * This file replaces the frontend-only stub service
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// -----------------------------------------------------------------------------
// READ ALL
// -----------------------------------------------------------------------------
// GET endpoint /expenses. fetch defaults to GET unless specified otherwise

export async function listExpenses() {
  const response = await fetch(`${API_BASE_URL}/expenses`);
  const data = await response.json();

  if (!response.ok) {
    // note: ok field comes from the fetch API response obj created by browser. Not from the API, not from express, not from mongo
    console.error(data.message);
  }

  return data;
}

// -----------------------------------------------------------------------------
// CREATE EXPENSE
// -----------------------------------------------------------------------------
// POST endpoint /expenses. javascript function only has fetch and no post.

export async function createExpense(expenseData) {
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
}

// -----------------------------------------------------------------------------
// UPDATE EXPENSE
// -----------------------------------------------------------------------------
// PUT endpoint /expenses/:id

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
// DELETE EXPENSE
// -----------------------------------------------------------------------------
// DELETE endpoint /expenses/:id

export const deleteExpense = async (id) => {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data.message);
  }

  return data;
};
