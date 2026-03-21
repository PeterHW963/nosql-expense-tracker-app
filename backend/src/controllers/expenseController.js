import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

// helper to get expenses collection
function getExpensesCollection() {
  return getDB().collection("expenses");
}

// helper to ensure data consistency through validation
function validateExpenseBody(body) {
  const { name, category, date, amount, location, description } = body;

  // REQUIRED FIELDS
  if (!name || String(name).trim() === "") {
    return "Name is required";
  }

  if (!category || String(category).trim() === "") {
    return "Category is required";
  }

  if (!date || Number.isNaN(new Date(date).getTime())) {
    return "Valid date is required";
  }

  if (amount === undefined || amount === null || Number.isNaN(Number(amount))) {
    return "Valid amount is required";
  }

  // OPTIONAL FIELDS
  if (location !== undefined && typeof location !== "string") {
    return "Location must be a string";
  }

  if (description !== undefined && typeof description !== "string") {
    return "Description must be a string";
  }

  return null;
}

// helper to build the expense doc. Note: mongodb doesnt have a native schema system like SQL DB.
// if you want a more schema-based approach, try using mongoose package
function buildExpenseDocument(body) {
  return {
    name: String(body.name).trim(),
    category: String(body.category).trim(),
    date: new Date(body.date),
    amount: Number(body.amount),
    location: body.location ? String(body.location).trim() : "",
    description: body.description ? String(body.description).trim() : "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function getAllExpenses(req, res) {
  try {
    const expenses = await getExpensesCollection()
      .find({})
      .sort({ date: -1, createdAt: -1 }) // sort desc date first, then desc createdAt
      .toArray();

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error getting expenses:", error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
}

export async function getExpenseById(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const expense = await getExpensesCollection().findOne({
      _id: new ObjectId(id), // mongodb's id field is _id
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error("Error getting expense by ID:", error);
    res.status(500).json({ message: "Failed to fetch expense" });
  }
}

export async function createExpense(req, res) {
  try {
    const validationError = validateExpenseBody(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const newExpense = buildExpenseDocument(req.body);

    const result = await getExpensesCollection().insertOne(newExpense);
    // insert one returns a field insertedId containg the _id value of the inserted document.

    const createdExpense = await getExpensesCollection().findOne({
      _id: result.insertedId,
    });

    res.status(201).json(createdExpense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Failed to create expense" });
  }
}

export async function updateExpense(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const validationError = validateExpenseBody(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const updatedExpense = {
      name: String(req.body.name).trim(),
      category: String(req.body.category).trim(),
      date: new Date(req.body.date),
      amount: Number(req.body.amount),
      location: req.body.location ? String(req.body.location).trim() : "",
      description: req.body.description
        ? String(req.body.description).trim()
        : "",
      updatedAt: new Date(),
    };

    const result = await getExpensesCollection().updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedExpense },
    );
    // updateOne returns matchedCount field containing # of matched docs
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const savedExpense = await getExpensesCollection().findOne({
      _id: new ObjectId(id),
    });

    res.status(200).json(savedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Failed to update expense" });
  }
}

export async function deleteExpense(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    const result = await getExpensesCollection().deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Failed to delete expense" });
  }
}
// NOTE FOR DELETE AND UPDATE, there are more succinct ways to do it: using findOneAndUpdate or findOneAndDelete. Can explore on your own
