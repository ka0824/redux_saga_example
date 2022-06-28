import axios from "axios";

const axiosConfig = axios.create({ baseURL: "http://localhost:4000" });

export const fetchA = async () => {
  const result = await axiosConfig.get("test1");
  return result.data.text;
};

export const fetchB = async () => {
  const result = await axiosConfig.get("test2");
  return result.data.text;
};

export const fetchC = async () => {
  const result = await axiosConfig.get("test3");
  return result.data.text;
};
