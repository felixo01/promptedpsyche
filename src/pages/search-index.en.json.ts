import type { APIContext } from 'astro';
import { buildSearchIndex } from '../lib/search';

export async function GET(_: APIContext) {
  return new Response(JSON.stringify(await buildSearchIndex('en')), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}
