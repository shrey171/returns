import { ZodType, z } from 'zod';

export interface ISchema {
  increment: number;
  inflation: number;
  rate: number;
  years: number;
  mode: 'annual' | 'monthly';
}

export const Schema: ZodType<ISchema> = z.object({
  increment: z.number({ message: 'Invalid Value' }).max(1000000, { message: 'Max 1 Million' }),
  inflation: z.number({ message: 'Invalid Value' }).min(0, { message: 'Min 0%' }).max(100, { message: 'Max 100%' }),
  rate: z.number({ message: 'Invalid Value' }).min(1, { message: 'Min 1%' }).max(30, { message: 'Max 30%' }),
  years: z.number({ message: 'Invalid Value' }).min(2, { message: 'At least 2 years' }).max(50, { message: 'Max 50' }),
  mode: z.enum(['annual', 'monthly']),
});