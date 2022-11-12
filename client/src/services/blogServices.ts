import axios from "axios";
import { NewBlog } from "../types/types";

const baseUrl = "http://localhost:3007/api/blogs/";

export const editBlog = async (data: NewBlog, id: string) => {
  const res = await axios.post(`${baseUrl}${id}`, data);
  return res.data;
};

export const addBlog = async (data: NewBlog) => {
  const res = await axios.post(`${baseUrl}create`, data);
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const res = await axios.delete(`${baseUrl}${id}`);
  return res.data;
};