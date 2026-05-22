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
import {
  collection,
  query,
  addDoc,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { anonymousAuth, db } from "../config/firebase";

const EXPENSES_COLLECTION = "expenses";

// -----------------------------------------------------------------------------
// STUB READ ALL
// -----------------------------------------------------------------------------
// - Firestore branch: query Firestore collection/documents
// - MongoDB branch: fetch from REST API endpoint like GET /expenses

export const listExpenses = async () => {
  const user = await anonymousAuth();
  const expensesCollectionRef = collection(db, EXPENSES_COLLECTION);
  const getExpensesQuery = query(
    expensesCollectionRef,
    where("userId", "==", user.uid),
    orderBy("date", "desc"),
  );
  const querySnapshot = await getDocs(getExpensesQuery);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// -----------------------------------------------------------------------------
// STUB CREATE EXPENSE
// -----------------------------------------------------------------------------
// - Firestore branch: addDoc(...)
// - MongoDB branch: REST API endpoint POST /expenses

export const createExpense = async (expenseData) => {
  const user = await anonymousAuth();
  const newExpense = {
    name: expenseData.name,
    category: expenseData.category,
    date: expenseData.date,
    amount: Number(expenseData.amount),
    location: expenseData.location || "",
    description: expenseData.description || "",
    userId: user.uid,
  };
  await addDoc(collection(db, EXPENSES_COLLECTION), newExpense);
  return;
};

// -----------------------------------------------------------------------------
// STUB: UPDATE EXPENSE
// -----------------------------------------------------------------------------
// - Firestore branch: updateDoc(...)
// - MongoDB branch: REST API endpoint PUT /expenses/:id

export const updateExpense = async (id, updatedData) => {
  await anonymousAuth();

  const expenseRef = doc(db, EXPENSES_COLLECTION, id);

  await updateDoc(expenseRef, {
    name: updatedData.name,
    category: updatedData.category,
    date: updatedData.date,
    amount: Number(updatedData.amount),
    location: updatedData.location || "",
    description: updatedData.description || "",
  });
  return;
};

// -----------------------------------------------------------------------------
// STUB: DELETE EXPENSE
// -----------------------------------------------------------------------------
// - Firestore branch: deleteDoc(...)
// - MongoDB branch: REST API endpoint DELETE /expenses/:id

export const deleteExpense = async (id) => {
  await anonymousAuth();

  const expenseRef = doc(db, EXPENSES_COLLECTION, id);
  await deleteDoc(expenseRef);
  return;
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
