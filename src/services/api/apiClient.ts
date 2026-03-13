/**
 * Placeholder for API client setup, possibly using axios.
 */

const apiClient = {
  get: async (endpoint: string) => {
    console.log(`GET ${endpoint}`);
  },
  post: async (endpoint: string, data: any) => {
    console.log(`POST ${endpoint}`, data);
  },
};

export default apiClient;
