import axios from "axios";

const productApi = axios.create({
  baseURL: "http://localhost:3000/products",
});

export const getProducts = async () => {
  const response = await productApi.get("/");
  return response.data;
};

export const createProduct = async (product) =>
  await productApi.post("/", product);

export const deleteProduct = (id) => productApi.delete(`/${id}`);

export const updateProduct = (product) =>
  productApi.put(`/${product.id}`, product);
