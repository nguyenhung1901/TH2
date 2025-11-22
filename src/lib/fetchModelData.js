/**
 * Fetch model data from the backend API
 * @param {string} url - The URL to fetch from (e.g., "/user/list", "/user/123")
 * @returns {Promise} - Promise that resolves to the fetched data
 */
async function fetchModel(url) {
  const API_BASE_URL = "http://localhost:8081/api";
  
  try {
    const response = await fetch(`${API_BASE_URL}${url}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching model:", error);
    throw error;
  }
}

export default fetchModel;