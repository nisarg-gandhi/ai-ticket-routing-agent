import { fetchWithAuth } from '../utils/fetchWithAuth';
const API_BASE_URL = 'http://localhost:8000';

export const customerService = {
  getCustomers: async () => {
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/customers/`);
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }
};
