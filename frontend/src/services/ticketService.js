const API_BASE_URL = 'http://localhost:8000';

/**
 * Service to handle API calls related to tickets
 */
const ticketService = {
  /**
   * Submit a new ticket to the backend
   * @param {Object} ticketData - The ticket data (customer_name, customer_email, subject, message)
   * @returns {Promise<Object>} The created ticket
   */
  async createTicket(ticketData) {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to create ticket');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating ticket:', error);
      // fetch throws a TypeError with message "Failed to fetch" if the server is offline or unreachable
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      throw error;
    }
  },

  /**
   * Fetch a single ticket by ID
   * @param {number|string} id - Ticket ID
   * @returns {Promise<Object>} The ticket
   */
  async getTicket(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ticket');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ticket ${id}:`, error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      throw error;
    }
  },

  /**
   * Fetch all tickets
   * @returns {Promise<Array>} List of tickets
   */
  async getTickets() {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets/`);
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching tickets:', error);
      // fetch throws a TypeError with message "Failed to fetch" if the server is offline or unreachable
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to server. Please ensure the backend is running.');
      }
      throw error;
    }
  }
};

export default ticketService;
