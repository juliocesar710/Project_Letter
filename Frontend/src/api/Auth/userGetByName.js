import api from '../Config/apiClient';

export const userGetByName = async (name) => {
  try {
    console.log(name)
    const response = await api.post("/auth/userByName", {name});
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}