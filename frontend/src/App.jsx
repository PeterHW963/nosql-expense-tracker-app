import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import RealtimeStatus from "./components/RealtimeStatus";
import {
  createExpense,
  deleteExpense,
  listExpenses,
  updateExpense,
} from "./services/expenseService";

// Toggle this:
// true  = Firestore
// false = MongoDB
const SHOW_REALTIME_STATUS = false;

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastEvent, setLastEvent] = useState("");
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const loadExpenses = async () => {
    try {
      const data = await listExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Failed to load expenses:", error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleSubmitExpense = async (expenseData) => {
    try {
      setIsSaving(true);

      if (editingExpense) {
        await updateExpense(editingExpense._id, expenseData);
        setLastEvent(`Updated "${expenseData.name}"`);
        setEditingExpense(null);
        setIsFormExpanded(false);
      } else {
        await createExpense(expenseData);
        setLastEvent(`Created "${expenseData.name}"`);
      }

      await loadExpenses();
    } catch (error) {
      console.error("Failed to save expense:", error);
      setLastEvent("Error while saving");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setIsFormExpanded(true);
    setLastEvent(`Editing "${expense.name}"`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteExpense = async (id) => {
    try {
      const target = expenses.find((expense) => expense._id === id);

      await deleteExpense(id);

      setLastEvent(`Deleted "${target?.name || "expense"}"`);

      if (editingExpense?._id === id) {
        setEditingExpense(null);
        setIsFormExpanded(false);
      }

      await loadExpenses();
    } catch (error) {
      console.error("Failed to delete expense:", error);
      setLastEvent("Error while deleting");
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setIsFormExpanded(false);
    setLastEvent("Edit cancelled");
  };

  const handleToggleExpand = () => {
    setIsFormExpanded((previous) => !previous);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <h1>Spendeee - Expense Tracker</h1>
          <p className="hero-text">Track your expenses starting today</p>
        </div>
      </header>

      <main className="main-layout">
        {!SHOW_REALTIME_STATUS && lastEvent && (
          <p className="status-text">{lastEvent}</p>
        )}
        {SHOW_REALTIME_STATUS && (
          <RealtimeStatus
            connectionLabel="Realtime enabled"
            userLabel="demo-user-anonymous"
            lastEvent={lastEvent}
          />
        )}

        <ExpenseForm
          editingExpense={editingExpense}
          onSubmit={handleSubmitExpense}
          onCancel={handleCancelEdit}
          isSaving={isSaving}
          isExpanded={isFormExpanded}
          onToggleExpand={handleToggleExpand}
        />

        <ExpenseList
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </main>
    </div>
  );
}

export default App;
