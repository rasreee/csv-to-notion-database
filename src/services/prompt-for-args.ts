import environment from 'configs/env';
import { isNonEmptyString } from 'lib/assertion';
import { createQuestion, createQuestions, getAnswers } from 'lib/prompt';

export type CommandArgs = {
  inputFile: string;
  databaseId: string;
  apiKey: string;
};

const useEnvFileQuestion = createQuestion({
  type: 'confirm',
  name: 'useEnvFile',
  message: 'Use .env file?',
});

const appConfigQuestions = createQuestions([
  {
    type: 'password',
    name: 'apiKey',
    message: 'Notion API key:',
    validate: isNonEmptyString,
  },
  {
    type: 'text',
    name: 'databaseId',
    message: 'ID of the database to update:',
    validate: isNonEmptyString,
  },
  {
    type: 'text',
    name: 'inputFile',
    message: 'Location of CSV file to ingest:',
    validate: isNonEmptyString,
  },
]);

export const promptForArgs = async (): Promise<CommandArgs> => {
  const { useEnvFile } = await getAnswers(useEnvFileQuestion);

  if (useEnvFile) {
    return { ...environment };
  }

  return getAnswers<CommandArgs>(appConfigQuestions);
};
