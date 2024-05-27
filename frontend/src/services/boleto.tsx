import axios from 'axios';

export const boletoAPI = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BOLETO_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};
