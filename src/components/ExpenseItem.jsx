import { formatCurrency } from "../models/expenses";

function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <article className="expense-item">
      <div className="expense-main">
        <div className="expense-top-row">
          <h3>{expense.name}</h3>
          <span className="expense-amount">
            {formatCurrency(expense.amount)}
          </span>
        </div>

        <div className="expense-meta">
          <span className="badge">{expense.category}</span>
          <span>{expense.date}</span>
          {expense.location && <span>{expense.location}</span>}
        </div>

        {expense.description && (
          <p className="expense-description">{expense.description}</p>
        )}
      </div>

      <div className="expense-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(expense)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(expense.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default ExpenseItem;
