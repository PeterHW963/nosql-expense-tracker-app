import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  where,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, ensureAnonymousAuth } from "../config/firebase";

/**
 * FIREBASE IMPLEMENTATION
 *
 * This file replaces the frontend-only stub service.
 *
 */

const EXPENSES_COLLECTION = "expenses";

// remove notifyListeners() because we are using realtime listener

// -----------------------------------------------------------------------------
// READ ALL
// -----------------------------------------------------------------------------
// Firestore uses getDocs to fetch multiple documents from a collection
export const listExpenses = async () => {
  const user = await ensureAnonymousAuth();

  const expensesRef = collection(db, EXPENSES_COLLECTION);
  const expensesQuery = query(
    expensesRef,
    where("userId", "==", user.uid),
    orderBy("date", "desc"),
  );

  const snapshot = await getDocs(expensesQuery);

  return snapshot.docs.map((documentSnapshot) => ({
    id: documentSnapshot.id,
    ...documentSnapshot.data(),
  }));
};

// -----------------------------------------------------------------------------
// CREATE EXPENSE
// -----------------------------------------------------------------------------
// Firestore uses addDoc to add a document into the specific collection.
// Note that no schema needs to be declared beforehand

export const createExpense = async (expenseData) => {
  const user = await ensureAnonymousAuth();
  const newExpense = {
    name: expenseData.name,
    category: expenseData.category,
    date: expenseData.date,
    amount: Number(expenseData.amount),
    location: expenseData.location || "",
    description: expenseData.description || "",
    userId: user.uid,
  };

  const docRef = await addDoc(collection(db, EXPENSES_COLLECTION), newExpense);
  return {
    id: docRef.id,
    ...newExpense,
  };
};

// -----------------------------------------------------------------------------
// UPDATE EXPENSE
// -----------------------------------------------------------------------------
// Firestore uses updateDoc(...) for editing existing documents
// doc function is also used to get reference of document to edit

export const updateExpense = async (id, updatedData) => {
  await ensureAnonymousAuth();

  const expenseRef = doc(db, EXPENSES_COLLECTION, id);

  await updateDoc(expenseRef, {
    name: updatedData.name,
    category: updatedData.category,
    date: updatedData.date,
    amount: Number(updatedData.amount),
    location: updatedData.location || "",
    description: updatedData.description || "",
  });
};

// -----------------------------------------------------------------------------
// DELETE EXPENSE
// -----------------------------------------------------------------------------
// Firestore uses deleteDoc(...) to delete document with specified id

export const deleteExpense = async (id) => {
  await ensureAnonymousAuth();

  const expenseRef = doc(db, EXPENSES_COLLECTION, id);
  await deleteDoc(expenseRef);
};

// -----------------------------------------------------------------------------
// REALTIME SUBSCRIPTION
// -----------------------------------------------------------------------------
// Firestore uses onSnapshot(...)
// Must return an unsubscribe function so App.jsx can clean it up.

export const subscribeToExpenses = async (callback) => {
  const user = await ensureAnonymousAuth();

  const expensesRef = collection(db, EXPENSES_COLLECTION);
  const expensesQuery = query(
    expensesRef,
    where("userId", "==", user.uid),
    orderBy("date", "desc"),
  );

  // onSnapshot starts a live listener: everytime data changes, the subscribe callback runs
  const unsubscribe = onSnapshot(
    expensesQuery,
    (snapshot) => {
      const expenses = snapshot.docs.map((documentSnapshot) => ({
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      }));

      callback(expenses); // ~ setExpenses(data)
    },
    (error) => {
      console.error("Firestore subscribe error:", error);
    },
  );

  // unsubscribe - the fn wrapping the listener logic is returned because that is how u cleanup the listener
  return unsubscribe;
};
