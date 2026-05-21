import jsdoc from 'jsdoc-api';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const LIB_PATH = resolve(__dirname, '../../p5.fab-website-before-chi-personal-repo-live/p5.fab-website/static/p5.fab.js');
const OUT_PATH = resolve(__dirname, '../src/content/reference.json');

const docs = await jsdoc.explain({ files: LIB_PATH });

const methods = docs
  .filter(entry =>
    entry.kind === 'function' &&
    entry.memberof === 'Fab' &&
    !entry.undocumented &&
    entry.access !== 'private'
  )
  .map(entry => ({
    name: entry.name.includes('#') ? entry.name.split('#')[1] : entry.name,
    description: entry.description ?? '',
    params: (entry.params ?? []).map(p => ({
      name: p.name,
      type: p.type?.names?.join(' | ') ?? '',
      description: p.description ?? '',
      optional: p.optional ?? false,
      defaultvalue: p.defaultvalue ?? null,
    })),
    returns: entry.returns?.[0]
      ? {
          type: entry.returns[0].type?.names?.join(' | ') ?? '',
          description: entry.returns[0].description ?? '',
        }
      : null,
    examples: (entry.examples ?? []),
  }));

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, JSON.stringify(methods, null, 2));

console.log(`Extracted ${methods.length} methods → ${OUT_PATH}`);