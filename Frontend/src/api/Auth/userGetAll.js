import api from '../Config/apiClient';

export const userGetAll = async () => {
  try {
    const response = await api.get("/auth/users");
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}