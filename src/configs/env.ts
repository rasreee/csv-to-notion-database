import dotenv from 'dotenv';
dotenv.config();

import { CommandArgs } from 'services/prompt-for-args';

export type NodeEnv = 'production' | 'development' | 'test';

export const toNodeEnv = (nodeEnv: any): NodeEnv => {
  if (['production', 'development', 'test'].includes(nodeEnv)) {
    return nodeEnv;
  }

  throw new Error(`NODE_ENV ${nodeEnv} is not valid`);
};

export type Env = CommandArgs & { nodeEnv: NodeEnv };

const environment: Env = Object.freeze({
  apiKey: process.env.NOTION_API_KEY ?? '',
  databaseId: process.env.NOTION_DATABASE_ID ?? '',
  inputFile: process.env.RATINGS_CSV_FILE ?? 'static/data/ratings-source.csv',
  nodeEnv: toNodeEnv(process.env.NODE_ENV),
});

export default environment;
