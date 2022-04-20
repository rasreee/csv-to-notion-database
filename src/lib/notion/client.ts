import { Client } from '@notionhq/client';
export const createClient = (apiKey: string): Client => {
  const client = new Client({ auth: apiKey });

  return client;
};
