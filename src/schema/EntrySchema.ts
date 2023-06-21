import { z } from 'zod';

export const EntrySchema = z.object({
  path: z.string(),
  is_directory: z.boolean(),
});

export type Entry = z.infer<typeof EntrySchema>;
