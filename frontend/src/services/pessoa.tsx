import axios from 'axios';

export const pessoaAPI = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_PESSOA_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
};
