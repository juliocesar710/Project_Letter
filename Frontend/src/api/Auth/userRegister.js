import api from '../Config/apiClient';

export const signup = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    console.log('Usuário registrado com sucesso:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.response?.data || error.message);
    throw error;
  }
};