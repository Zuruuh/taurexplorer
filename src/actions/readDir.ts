import { invoke } from '@tauri-apps/api';
import { z } from 'zod';
import { Entry, EntrySchema } from '../schema/EntrySchema';

export async function readDir(dir: string): Promise<Entry[]> {
  return z.array(EntrySchema).parse(await invoke('read_dir', { dir }));
}
