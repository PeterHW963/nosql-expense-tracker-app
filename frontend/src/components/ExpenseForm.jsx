import { useEffect, useState } from "react";
import { createEmptyExpense, EXPENSE_CATEGORIES } from "../models/expenses";

function ExpenseForm({
  editingExpense,
  onSubmit,
  onCancel,
  isSaving,
  isExpanded,
  onToggleExpand,
}) {
  const [formData, setFormData] = useState(createEmptyExpense());

  useEffect(() => {
    if (editingExpense) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        ...editingExpense,
        date: editingExpense.date
          ? new Date(editingExpense.date).toISOString().split("T")[0] // important: date format in mongo is diff from javascript date format
          : "",
        amount: editingExpense.amount?.toString() ?? "",
      });
    } else {
      setFormData(createEmptyExpense());
    }
  }, [editingExpense]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.category ||
      !formData.date ||
      !formData.amount
    ) {
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
    });

    if (!editingExpense) {
      setFormData(createEmptyExpense());
    }
  };

  return (
    <section className="card form-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Expense Form</p>
          <h2>{editingExpense ? "Edit Expense" : "Add New Expense"}</h2>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onToggleExpand}
        >
          {isExpanded
            ? "Collapse Form"
            : editingExpense
              ? "Continue Editing"
              : "Add Expense"}
        </button>
      </div>

      {isExpanded && (
        <form className="expense-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Lunch"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {EXPENSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="date">Date *</label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="amount">Amount (SGD) *</label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Optional"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="field field-full">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Optional notes about the expense"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : editingExpense
                  ? "Update Expense"
                  : "Add Expense"}
            </button>

            {editingExpense && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={onCancel}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}
    </section>
  );
}

export default ExpenseForm;
