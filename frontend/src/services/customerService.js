import { fetchWithAuth } from '../utils/fetchWithAuth';


export const customerService = {
  getCustomers: async () => {
    try {
      const response = await fetchWithAuth('/customers/');
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
