// Details.js
"use client";

import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { BarChart, ChartCard, DialogBox } from "@/components";
import HttpService from "@/services/httpService";
import {
  getDayDetails,
  getMonthDetails,
  getMonthToDate,
  getYearToDate,
} from "@/utils/ApiRequests";
import { months } from "@/utils/months";
import { Button, TextField } from "@mui/material";
import { getCurrentDate } from "@/utils/convertDate";
import { ToastService } from "@/services/toast";

export default function Details() {
  const [dailyDialogOpen, setDailyDialogOpen] = useState(false);
  const [monthlyDialogOpen, setMonthlyDialogOpen] = useState(false);

  const [monthToDateOpen, setMonthToDateOpen] = useState(false);
  const [yearToDateOpen, setYearToDateOpen] = useState(false);

  const [chartData, setChartData] = useState();
  const [monthlyChartData, setMonthlyChartData] = useState();
  const [monthToDateData, setMonthToDateData] = useState();
  const [yearToDateData, setYearToDateData] = useState();

  const [formData, setFormData] = useState({
    selectedDate: "",
    selectedType: "max",
  });

  const [monthFormData, setMonthFormData] = useState({
    selectedType: "max",
    selectedMonth: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Month
  const handleMonthChange = (event) => {
    const { name, value } = event.target;
    setMonthFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    HttpService.fetch(
      "GET",
      getDayDetails +
        `?calculatedType=${formData.selectedType}&date=${formData.selectedDate}`
    )
      .then((res) => {
        if (res.data) setChartData(res.data);
      })
      .catch((error) => {
        ToastService.error(error.response.data.message);
      });
  };

  //Month
  const handleMonthSave = () => {
    HttpService.fetch(
      "GET",
      getMonthDetails +
        `?calculatedType=${monthFormData.selectedType}&month=${monthFormData.selectedMonth}`
    )
      .then((res) => {
        if (res.data) setMonthlyChartData(res.data);
      })
      .catch((error) => {
        ToastService.error(error.response.data.message);
      });
  };

  //Month to date
  const handleMonthToDate = () => {
    setMonthToDateOpen(true);
    const currentDate = getCurrentDate();
    console.log(currentDate);

    HttpService.fetch("GET", getMonthToDate + `?date=${currentDate}`)
      .then((res) => {
        if (res.data) setMonthToDateData(res.data);
      })
      .catch((error) => {
        ToastService.error(error.response.data.message);
      });
  };

  //Month to date
  const handleYearToDate = () => {
    setYearToDateOpen(true);
    const currentDate = getCurrentDate();

    HttpService.fetch("GET", getYearToDate + `?date=${currentDate}`)
      .then((res) => {
        if (res.data) setYearToDateData(res.data);
      })
      .catch((error) => {
        ToastService.error(error.response.data.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        marginTop: 80,
        gap: 80,
      }}
    >
      <Typography
        variant="h4"
        style={{ marginBottom: 20, textAlign: "center" }}
      >
        Expense Details
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <ChartCard
          onClick={() => setDailyDialogOpen(true)}
          title="Daily"
          subtitle="Bar chart Daily"
          imagePath="https://atlas-content-cdn.pixelsquid.com/stock-images/bar-graph-y1KAkP1-600.jpg"
        />
        <ChartCard
          onClick={() => setMonthlyDialogOpen(true)}
          title="Monthly"
          subtitle="Bar chart Monthly"
          imagePath="https://atlas-content-cdn.pixelsquid.com/stock-images/bar-graph-y1KAkP1-600.jpg"
        />
        <ChartCard
          onClick={handleMonthToDate}
          title="Month to Date"
          subtitle="Bar chart Total Month to Date"
          imagePath="https://atlas-content-cdn.pixelsquid.com/stock-images/bar-graph-y1KAkP1-600.jpg"
        />
        <ChartCard
          onClick={handleYearToDate}
          title="Year to date"
          subtitle="Bar chart Total Year To Date"
          imagePath="https://atlas-content-cdn.pixelsquid.com/stock-images/bar-graph-y1KAkP1-600.jpg"
        />
      </div>

      <DialogBox
        isOpen={dailyDialogOpen}
        onClose={() => setDailyDialogOpen(false)}
        title="Daily Detils"
      >
        <TextField
          label="Select Date"
          type="date"
          name="selectedDate"
          value={formData.selectedDate}
          onChange={(e) => handleChange(e)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          select
          name="selectedType"
          value={formData.selectedType}
          onChange={(e) => handleChange(e)}
          fullWidth
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="max">Max</option>
          <option value="min">Min</option>
          <option value="average">Average</option>
          <option value="total">Total</option>
        </TextField>
        {chartData && <BarChart data={chartData} />}
        <Button onClick={() => setDailyDialogOpen(false)}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Filter
        </Button>
      </DialogBox>

      <DialogBox
        isOpen={monthlyDialogOpen}
        onClose={() => setMonthlyDialogOpen(false)}
        title="Monthly Detils"
      >
        <TextField
          select
          name="selectedType"
          value={monthFormData.selectedType}
          onChange={(e) => handleMonthChange(e)}
          fullWidth
          margin="normal"
          SelectProps={{
            native: true,
          }}
        >
          <option value="max">Max</option>
          <option value="average">Average</option>
          <option value="total">Total</option>
        </TextField>
        <TextField
          select
          name="selectedMonth"
          fullWidth
          margin="normal"
          value={monthFormData.selectedMonth}
          onChange={(e) => handleMonthChange(e)}
          SelectProps={{
            native: true,
          }}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </TextField>
        {monthlyChartData && <BarChart data={monthlyChartData} />}
        <Button onClick={() => setMonthlyDialogOpen(false)}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleMonthSave}>
          Filter
        </Button>
      </DialogBox>
      <DialogBox
        isOpen={monthToDateOpen}
        onClose={() => setMonthToDateOpen(false)}
        title="Month To Date"
      >
        {monthToDateData && <BarChart data={monthToDateData} />}
      </DialogBox>

      <DialogBox
        isOpen={yearToDateOpen}
        onClose={() => setYearToDateOpen(false)}
        title="Year To Date"
      >
        {yearToDateData && <BarChart data={yearToDateData} />}
      </DialogBox>
    </div>
  );
}
