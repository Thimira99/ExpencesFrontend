// Dashboard.js
"use client";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  addCategorie,
  addExpenses,
  deleteExpenseById,
  getCategories,
  getExpenseById,
  getExpenses,
  getFilterExpenses,
  updateExpenseById,
} from "@/utils/ApiRequests";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import {
  AddCategoryDialog,
  EditExpenseDialog,
  ExpenseDialog,
} from "@/components";
import { ToastService } from "@/services/toast";
import { convertToIsoDate } from "@/utils/convertDate";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import CircularProgress from "@mui/material/CircularProgress";
import HttpService from "@/services/httpService";

export default function Dashboard() {
  const [userDate, setUserData] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [userExpense, setUserExpense] = useState();

  // Modal status
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isEditExpenseOpen, setIsEditExpenseOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const [newExpenseData, setNewExpenseData] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });
  const [newCategoryData, setNewCategoryData] = useState({
    category: "",
  });
  const [filterCategory, setfilterCategoryData] = useState({
    category: "",
  });

  // Loading status
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // Fetch Expenses and User Categories concurrently using Promise.all
  useEffect(() => {
    setLoading(true);
    Promise.all([
      HttpService.fetch("GET", getExpenses),
      HttpService.fetch("GET", getCategories),
    ])
      .then(([expensesRes, categoriesRes]) => {
        setUserData(expensesRes.data);
        setUserCategories(categoriesRes.data);
      })
      .catch((error) => {
        ToastService.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
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

  // Handle edit expense
  const handleEdit = (id) => {
    setEditLoading(true);

    HttpService.fetch("GET", getExpenseById + `/${id}`)
      .then((res) => {
        if (res.data) {
          setUserExpense(res.data);
          setIsEditExpenseOpen(true);
        } else {
          console.log("Data is undefined or null");
        }
      })
      .catch((error) => {
        console.error("Error fetching expense by ID:", error);
      })
      .finally(() => {
        setEditLoading(false);
      });
  };

  // Add logic for deleting expense
  const handleDelete = (id) => {
    setLoading(true);
    HttpService.fetch("DELETE", deleteExpenseById + `/${id}`).then((res) => {
      ToastService.success(res.data.message);

      HttpService.fetch("GET", getExpenses)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => {
          ToastService.error(error.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  // Input changes
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

  const handleEditExpenseChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserExpense((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle save category
  const handleSaveCategory = () => {
    const { category } = newCategoryData;

    HttpService.fetch("PUT", addCategorie, newCategoryData)
      .then((res) => {
        setIsAddCategoryOpen(false);

        // Update userCategories with the new category data
        setUserCategories((prevCategories) => [...prevCategories, category]);

        setNewCategoryData({
          category: "",
        });
        ToastService.success("Added successfully");
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
  };

  // Handle save expense
  const handleSaveExpense = () => {
    const { date, amount, ...rest } = newExpenseData;
    const isoDate = convertToIsoDate(date);
    const amountNumber = Number(amount);
    const updatedExpenseData = { ...rest, date: isoDate, amount: amountNumber };

    console.log(updatedExpenseData);

    // Make axios call
    HttpService.fetch("POST", addExpenses, updatedExpenseData)
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

  // Handle save category
  const handleEditExpense = () => {
    const { date, amount, ...rest } = userExpense;
    const isoDate = convertToIsoDate(date);
    const amountNumber = Number(amount);
    const updatedEditExpenseData = {
      ...rest,
      date: isoDate,
      amount: amountNumber,
    };

    HttpService.fetch(
      "PUT",
      updateExpenseById + `/${updatedEditExpenseData._id}`,
      updatedEditExpenseData
    )
      .then((res) => {
        ToastService.success(res.data.message);
        HttpService.fetch("GET", getExpenses)
          .then((res) => {
            setUserData(res.data);
          })
          .catch((error) => {
            ToastService.error(error.response.data);
          });
      })
      .catch((error) => {
        ToastService.error(error.response.data.message);
      })
      .finally(() => {
        setIsEditExpenseOpen(false);
      });
  };

  // Handle filter change
  const onFilterChange = (e) => {
    e.preventDefault();
    setfilterCategoryData(e.target.value);
    setLoading(true);

    HttpService.fetch("GET", getFilterExpenses + `?category=${e.target.value}`)
      .then((res) => {
        setUserData(res.data);
      })
      .finally(() => {
        setLoading(false);
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
          sx={{ width: "30%" }}
          variant="contained"
          color="primary"
          startIcon={<AttachMoneyIcon />}
          onClick={() => setIsAddExpenseOpen(true)}
        >
          Add Expense
        </Button>
        <Button
          sx={{ width: "30%" }}
          variant="contained"
          color="primary"
          startIcon={<CategoryIcon />}
          onClick={() => setIsAddCategoryOpen(true)}
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
        {loading || editLoading ? (
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={userDate}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={getRowId}
          />
        )}
      </div>
      <ExpenseDialog
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onSave={handleSaveExpense}
        formData={newExpenseData}
        onInputChange={handleInputChange}
        categoryOptions={userCategories}
      />
      <AddCategoryDialog
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSave={handleSaveCategory}
        formData={newCategoryData}
        onInputChange={handleCategoryInputChange}
      />
      <EditExpenseDialog
        isOpen={isEditExpenseOpen}
        onClose={() => setIsEditExpenseOpen(false)}
        onSave={handleEditExpense}
        formData={userExpense}
        onInputChange={handleEditExpenseChange}
        categoryOptions={userCategories}
      />
    </div>
  );
}
