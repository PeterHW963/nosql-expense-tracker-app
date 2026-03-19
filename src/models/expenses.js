// Model file for schema of expenses

export const EXPENSE_CATEGORIES = [
  "Food",
  "Drinks",
  "Snack",
  "Transport",
  "Shopping",
  "Entertainment",
  "Housing",
  "Bills",
  "Medical",
  "Social",
  "Gift",
  "Electronics",
  "Travel",
  "Other",
];

export const createEmptyExpense = () => ({
  id: "",
  name: "",
  category: "Food",
  date: "",
  amount: "",
  location: "",
  description: "",
});

export const formatCurrency = (amount) => {
  const numericAmount = Number(amount || 0);

  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(numericAmount);
};
