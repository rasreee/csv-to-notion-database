import prompts, { Answers } from 'prompts';

import { PromptObjectWithName, Questions } from './prompt.types';

export const createQuestion = <N extends string = string>(promptObject: PromptObjectWithName<N>): PromptObjectWithName<N> => {
  return promptObject;
};

export const createQuestions = <N extends string = string>(promptObject: Questions<N>): Questions<N> => {
  return promptObject;
};

export async function getAnswers<
  A extends Answers<string>,
  N extends keyof A extends string ? keyof A : never = keyof A extends string ? keyof A : never,
>(questions: Questions<N>): Promise<A> {
  const result = await prompts<N>(questions, {
    onCancel: () => {
      console.info('Cancelling...');
      process.exit(0);
    },
  });

  return result as Awaited<A>;
}

/**
 * Prompts command-line user
 */
export class Prompter<
  A extends Answers<string> = Answers<string>,
  N extends keyof A extends string ? keyof A : never = keyof A extends string ? keyof A : never,
> {
  answers: A;

  constructor(private readonly questions: Questions<N> | never) {
    this.answers = {} as A;
  }

  run = async () => {
    this.answers = await getAnswers(this.questions);
  };
}
