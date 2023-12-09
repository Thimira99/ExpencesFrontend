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
import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
} from "@mui/material";
import { getCurrentDate } from "@/utils/convertDate";
import { ToastService } from "@/services/toast";

export default function Details() {
  // Dialog box open
  const [dailyDialogOpen, setDailyDialogOpen] = useState(false);
  const [monthlyDialogOpen, setMonthlyDialogOpen] = useState(false);
  const [monthToDateOpen, setMonthToDateOpen] = useState(false);
  const [yearToDateOpen, setYearToDateOpen] = useState(false);

  // Charts data
  const [chartData, setChartData] = useState();
  const [monthlyChartData, setMonthlyChartData] = useState();
  const [monthToDateData, setMonthToDateData] = useState();
  const [yearToDateData, setYearToDateData] = useState();

  // Loading state
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    selectedDate: "",
    selectedType: "max",
  });

  const [monthFormData, setMonthFormData] = useState({
    selectedType: "max",
    selectedMonth: "",
  });

  // Handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle monthly change
  const handleMonthChange = (event) => {
    const { name, value } = event.target;
    setMonthFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle save
  const handleSave = () => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle monthly save
  const handleMonthSave = () => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle Month to date
  const handleMonthToDate = () => {
    setMonthToDateOpen(true);
    const currentDate = getCurrentDate();

    setLoading(true);

    HttpService.fetch("GET", getMonthToDate + `?date=${currentDate}`)
      .then((res) => {
        if (res.data) setMonthToDateData(res.data);
      })
      .catch((error) => {
        ToastService.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Handle month to date
  const handleYearToDate = () => {
    setYearToDateOpen(true);
    const currentDate = getCurrentDate();

    setLoading(true);

    HttpService.fetch("GET", getYearToDate + `?date=${currentDate}`)
      .then((res) => {
        if (res.data) setYearToDateData(res.data);
      })
      .catch((error) => {
        ToastService.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container
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
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <ChartCard
          onClick={() => setDailyDialogOpen(true)}
          title="Daily"
          subtitle="Bar chart Daily"
          minWidth={300}
          maxWidth={400}
          imagePath="https://atlas-content-cdn.pixelsquid.com/stock-images/bar-graph-y1KAkP1-600.jpg"
        />
        <ChartCard
          onClick={() => setMonthlyDialogOpen(true)}
          title="Monthly"
          subtitle="Bar chart Monthly"
          minWidth={300}
          maxWidth={400}
          imagePath="https://atlas-content-cdn.pixelsquid.com/stock-images/bar-graph-y1KAkP1-600.jpg"
        />
        <ChartCard
          onClick={handleMonthToDate}
          title="Month to Date"
          subtitle="Bar chart Total Month to Date"
          minWidth={300}
          maxWidth={400}
          imagePath="https://atlas-content-cdn.pixelsquid.com/stock-images/bar-graph-y1KAkP1-600.jpg"
        />
        <ChartCard
          onClick={handleYearToDate}
          title="Year to date"
          subtitle="Bar chart Total Year To Date"
          minWidth={300}
          maxWidth={400}
          imagePath="https://atlas-content-cdn.pixelsquid.com/stock-images/bar-graph-y1KAkP1-600.jpg"
        />
      </Container>

      {/* Daily dialog box open */}
      <DialogBox
        isOpen={dailyDialogOpen}
        onClose={() => setDailyDialogOpen(false)}
        title="Daily Detils"
      >
        <TextField
          type="date"
          name="selectedDate"
          value={formData.selectedDate}
          onChange={(e) => handleChange(e)}
          fullWidth
          margin="normal"
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
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>{chartData && <BarChart data={chartData} />}</>
        )}

        <Button onClick={() => setDailyDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Filter
        </Button>
      </DialogBox>

      {/* Monthly dialog box open */}
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
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>{monthlyChartData && <BarChart data={monthlyChartData} />}</>
        )}

        <Button onClick={() => setMonthlyDialogOpen(false)} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleMonthSave}>
          Filter
        </Button>
      </DialogBox>

      {/* Month to date dialog box open */}
      <DialogBox
        isOpen={monthToDateOpen}
        onClose={() => setMonthToDateOpen(false)}
        title="Month To Date"
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>{monthToDateData && <BarChart data={monthToDateData} />}</>
        )}
      </DialogBox>

      {/* Year to date dialog box open */}
      <DialogBox
        isOpen={yearToDateOpen}
        onClose={() => setYearToDateOpen(false)}
        title="Year To Date"
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", padding: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>{yearToDateData && <BarChart data={yearToDateData} />}</>
        )}
      </DialogBox>
    </Container>
  );
}
