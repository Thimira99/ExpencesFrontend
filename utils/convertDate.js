// Convert to ISO date
export const convertToIsoDate = (dateString) => {
  if (!dateString) {
    throw new Error("Invalid date string");
  }

  const isoDateString = new Date(dateString).toISOString();
  return isoDateString;
};

// Get current date
export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};
