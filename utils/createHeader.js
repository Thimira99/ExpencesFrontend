export const createHeader = () => {
  const token = localStorage?.getItem("token");

  if (token) {
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  } else return null;
};
