import ExpenseItem from "./ExpenseItem";
import { formatCurrency } from "../models/expenses";

function ExpenseList({ expenses, onEdit, onDelete }) {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0,
  );

  return (
    <section className="card list-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Expense History</p>
          <h2>All Expenses</h2>
        </div>
        <div className="summary-pill">Total: {formatCurrency(totalAmount)}</div>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <p>No expenses yet.</p>
          <span>Add your first expense using the form above.</span>
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ExpenseList;
