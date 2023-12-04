export const convertToIsoDate = (dateString) => {
  if (!dateString) {
    throw new Error("Invalid date string");
  }

  const isoDateString = new Date(dateString).toISOString();
  return isoDateString;
};
