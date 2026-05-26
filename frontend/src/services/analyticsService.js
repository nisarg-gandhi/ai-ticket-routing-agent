import { fetchWithAuth } from '../utils/fetchWithAuth';


export const analyticsService = {
  getOverview: async () => {
    try {
      const response = await fetchWithAuth('/analytics/overview');
      if (!response.ok) {
        throw new Error('Failed to fetch analytics overview');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics overview:', error);
      throw error;
    }
  },

  getCharts: async () => {
    try {
      const response = await fetchWithAuth('/analytics/charts');
      if (!response.ok) {
        throw new Error('Failed to fetch analytics charts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics charts:', error);
      throw error;
    }
  },
};
