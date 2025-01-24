import axios from "axios";
import BASE_URL from "../config/api";

interface SavePreferencesResponse {
  message: string;
  user: {
    id: number;
    email: string;
    name: string;
    has_preferences: boolean;
    preferences: string[]; // Ajuste dependendo da estrutura real
  };
}

export const savePreferences = async (
  token: string,
  preferences: string[]
): Promise<SavePreferencesResponse> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/books/preferences`,
      { preferences },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Erro ao salvar preferências."
      );
    }
    throw new Error("Erro desconhecido ao salvar preferências.");
  }
};
