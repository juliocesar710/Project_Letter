import api from '../Config/apiClient';
import Cookies from 'js-cookie';

export const updateUser = async (userData) => {
  try {

    const token = Cookies.get('authToken'); 
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`; 

    const response = await api.patch('/auth/update', userData);
    console.log('Usuário atualizado com sucesso:', response.data);
    return response.data; 
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error.response?.data || error.message);
    throw error;
  }
}