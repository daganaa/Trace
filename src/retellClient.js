import Retell from 'retell-sdk';

export const client = new Retell({
  apiKey: import.meta.env.VITE_RETELL_API_KEY,
});
