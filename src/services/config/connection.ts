import { FetchInstance, fetchInstance } from "./fetchInstance";

export const connection = (instanceFetch: FetchInstance = fetchInstance) => {
  return {
    get: async (url: string, options = {}) => {
      const response = await instanceFetch({ url, options: { ...options, method: "GET" } });

      return response;
    },

    post: async (url: string, body: any, headers = {}, options = {}) => {
      const response = await instanceFetch({ url, body, headers: { ...headers }, options: { ...options, method: "POST" } });

      return response;
    },

    put: async (url: string, data: any, options = {}) => {
      const response = await instanceFetch({ url, body: data, options: { ...options, method: "PUT" } });

      return await response;
    },

    delete: async (url: string, options = {}) => {
      const response = await instanceFetch({ url, options: { ...options, method: "DELETE" } });
      return response;
    },
  };
};
