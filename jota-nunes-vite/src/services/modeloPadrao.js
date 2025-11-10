import api from "./axios";

// Busca os modelos padrão
export const getStandardModels = async () => {
  const response = await api.get("/standard-models/");
  return response.data;
};
export const getStandardModelById = async (id) => {
  const response = await api.get(`/standard-models/${id}/`);
  return response.data;
};
