const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

let sessionExpired = false;
export const resetSessionExpired = () => { sessionExpired = false; };

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fullUrl = `${BASE_URL}${url}`;
  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Guard against multiple concurrent 401s all firing the event.
    if (!sessionExpired) {
      sessionExpired = true;
      // Dispatch a global event so AuthContext can clear React state,
      // show a toast, and navigate to /login — all in one place.
      window.dispatchEvent(new CustomEvent('session:expired'));
    }
  }

  return response;
};
