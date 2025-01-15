import axios from "axios";
import BASE_URL from "../config/api";

interface LoginResponse {
  token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Tipagem específica para erros do Axios
      throw new Error(error.response?.data?.message || "Erro ao fazer login.");
    }
    // Caso o erro não seja do Axios
    throw new Error("Erro desconhecido ao fazer login.");
  }
};
