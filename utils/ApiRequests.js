// Host
export const host = "http://localhost:8000";

// Login and signup
export const loginAPI = `${host}/user/login`;
export const signupAPI = `${host}/user/signup`;

// Expenses
export const getExpenses = `${host}/expense`;
export const addExpenses = `${host}/expense`;
export const getExpenseById = `${host}/expense`;
export const updateExpenseById = `${host}/expense`;
export const deleteExpenseById = `${host}/expense`;
export const getFilterExpenses = `${host}/expense`;

// Categories
export const getCategories = `${host}/user/categories`;
export const addCategorie = `${host}/user/categories`;

export const getDayDetails = `${host}/expense/filter/filteredvaluesByDay`;
export const getMonthDetails = `${host}/expense/filter/filteredvaluesByMonth`;

export const getMonthToDate = `${host}/expense/categories/month-to-date`;
export const getYearToDate = `${host}/expense/categories/year-to-date`;
