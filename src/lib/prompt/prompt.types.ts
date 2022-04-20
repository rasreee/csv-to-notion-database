import { PromptObject } from 'prompts';

export type PromptObjectWithName<N extends string = string> = Readonly<PromptObject & { name: N }>;
export type Questions<N extends string = string> = PromptObjectWithName<N> | PromptObjectWithName<N>[];
