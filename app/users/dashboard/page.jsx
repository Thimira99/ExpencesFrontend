// Dashboard.js
"use client";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  addCategorie,
  addExpenses,
  getCategories,
  getExpenses,
  getFilterExpenses,
} from "@/utils/ApiRequests";
import { createHeader } from "@/utils/createHeader";
import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { AddCategoryDialog, ExpenseDialog } from "@/components";
import { ToastService } from "@/services/toast";
import { convertToIsoDate } from "@/utils/convertDate";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";

export default function Dashboard() {
  const header = createHeader();

  const [userDate, setUserData] = useState([]);
  const [userCategories, setUserCategories] = useState([]);

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [newExpenseData, setNewExpenseData] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({
    category: "",
  });

  const [filterCategory, setfilterCategoryData] = useState({
    category: "",
  });

  // Fetch Expenses and User Categories concurrently using Promise.all
  useEffect(() => {
    Promise.all([
      axios.get(getExpenses, header),
      axios.get(getCategories, header),
    ])
      .then(([expensesRes, categoriesRes]) => {
        setUserData(expensesRes.data);
        setUserCategories(categoriesRes.data);
      })
      .catch((error) => {
        ToastService.error(error.response.data.message);
      });
  }, []);

  // Table coloums
  const columns = [
    { field: "date", headerName: "Date", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <>
          <EditIcon
            style={{ cursor: "pointer", marginRight: "8px" }}
            onClick={() => handleEdit(params.row._id)}
          />
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      ),
    },
  ];

  const getRowId = (row) => row._id;

  const handleEdit = (id) => {
    console.log(`Edit clicked for ID: ${id}`);
    // Add logic for editing expense
  };

  const handleDelete = (id) => {
    console.log(`Delete clicked for ID: ${id}`);
    // Add logic for deleting expense
  };

  const handleAddExpense = () => {
    setIsAddExpenseOpen(true);
  };

  const handleCloseAddExpense = () => {
    setIsAddExpenseOpen(false);
  };

  const handleAddCategory = () => {
    setIsAddCategoryOpen(true);
  };

  const handleCloseAddCategory = () => {
    setIsAddCategoryOpen(false);
  };

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveCategory = () => {
    // Add logic to save category
    axios
      .put(addCategorie, newCategoryData, header)
      .then((res) => {
        setIsAddCategoryOpen(false);
        setNewCategoryData({
          category: "",
        });
        ToastService.success("Added successfuly");
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
  };

  const handleSaveExpense = () => {
    const { date, amount, ...rest } = newExpenseData;
    const isoDate = convertToIsoDate(date);
    const amountNumber = Number(amount);
    const updatedExpenseData = { ...rest, date: isoDate, amount: amountNumber };

    // Make axios call
    axios
      .post(addExpenses, updatedExpenseData, header)
      .then((res) => {
        setUserData([...userDate, res.data]);
        setIsAddExpenseOpen(false);
        setNewExpenseData({
          date: "",
          category: "",
          description: "",
          amount: "",
        });
        ToastService.success("Added successfuly");
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
  };

  const onFilterChange = (e) => {
    e.preventDefault();
    setfilterCategoryData(e.target.value);

    axios
      .get(getFilterExpenses + `?category=${e.target.value}`, header)
      .then((res) => {
        setUserData(res.data);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Expense Management Dashboard
      </Typography>
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "space-between",
          width: "60%",
          marginTop: 20,
        }}
      >
        <TextField
          fullWidth
          label="Category"
          select
          name="category"
          value={filterCategory}
          onChange={onFilterChange}
        >
          <MenuItem value="All">All</MenuItem>
          {userCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AttachMoneyIcon />}
          onClick={handleAddExpense}
        >
          Add Expense
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CategoryIcon />}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </div>
      <div
        style={{
          height: 400,
          width: "60%",
          padding: 20,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <DataGrid
          rows={userDate}
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={getRowId}
        />
      </div>
      <ExpenseDialog
        isOpen={isAddExpenseOpen}
        onClose={handleCloseAddExpense}
        onSave={handleSaveExpense}
        formData={newExpenseData}
        onInputChange={handleInputChange}
        categoryOptions={userCategories}
      />
      <AddCategoryDialog
        isOpen={isAddCategoryOpen}
        onClose={handleCloseAddCategory}
        onSave={handleSaveCategory}
        formData={newCategoryData}
        onInputChange={handleCategoryInputChange}
      />
    </div>
  );
}
