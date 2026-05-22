import express from "express";
import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controller/expenseController.js";

const router = express.Router();

router.get("/", getAllExpenses);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
