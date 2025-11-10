import api from "./axios";

export const login = async (username, password) => {
  const response = await api.post("/authentication/token/", {
    username,
    password,
  });

  return response.data;
};
