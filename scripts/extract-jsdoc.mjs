/**
 * Extracts JSDoc from p5.fab.js and writes reference.json.
 *
 * Handles two entry kinds from jsdoc-api:
 *   'function' — methods (fab.moveTo, fab.circle, …)
 *   'member'   — getter-only or getter+setter properties (fab.x, fab.maxX, …)
 *
 * Custom tag convention (@group):
 *   Every public entry must carry a @group tag. Valid group names (order determines
 *   sidebar order in DocsLayout.astro groupOrder):
 *     Structure, Setup, Configuration, Motion, Extrusion, Utilities, Print control
 *
 * Output schema for each entry:
 *   name        {string}          — method or property name
 *   kind        {'function'|'property'} — distinguishes methods from properties
 *   description {string}          — JSDoc description text
 *   group       {string|null}     — @group tag value; null triggers an extract warning
 *   readonly    {boolean}         — true when @readonly is present
 *   params      {Param[]}         — [] for properties
 *   returns     {Return|null}     — type+description for methods; type only for properties
 *   examples    {string[]}        — raw example strings
 */

import jsdoc from 'jsdoc-api';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.P5FAB_LIB_PATH) {
  console.error('Error: P5FAB_LIB_PATH env var is not set. Point it at the p5.fab.js file to extract docs from.');
  process.exit(1);
}
const LIB_PATH = process.env.P5FAB_LIB_PATH;
const OUT_PATH = resolve(__dirname, '../src/content/reference.json');
const VIRTUAL_PATH = resolve(__dirname, '../src/content/virtual-methods.json');
const GROUPS_PATH = resolve(__dirname, '../src/content/groups.json');

const docs = await jsdoc.explain({ files: LIB_PATH });

const methods = docs
  .filter(entry =>
    (entry.kind === 'function' || entry.kind === 'member') &&
    entry.memberof === 'Fab' &&
    !entry.undocumented &&
    entry.access !== 'private'
  )
  .map(entry => ({
    name: entry.name.includes('#') ? entry.name.split('#')[1] : entry.name,
    kind: entry.kind === 'member' ? 'property' : 'function',
    description: entry.description ?? '',
    group: entry.tags?.find(t => t.title === 'group')?.text ?? null,
    readonly: entry.readonly ?? false,
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
      : entry.type?.names
      ? { type: entry.type.names.join(' | '), description: '' }
      : null,
    examples: (entry.examples ?? []),
  }));

// Warn about documented Fab entries with unhandled kinds so future additions
// don't silently disappear from the reference.
const dropped = docs.filter(e =>
  e.memberof === 'Fab' &&
  !e.undocumented &&
  e.access !== 'private' &&
  e.tags?.some(t => t.title === 'group') &&
  e.kind !== 'function' && e.kind !== 'member'
);
if (dropped.length > 0) {
  process.stderr.write(
    `WARNING: dropped ${dropped.length} documented entries with unhandled kind: ` +
    `${[...new Set(dropped.map(e => e.kind))].join(', ')}\n`
  );
}

// Merge virtual-methods.json (hand-authored lifecycle hooks / user-defined extension points).
// Extracted JSDoc entries take precedence: if a name appears in both, the JSDoc version wins,
// so a future real implementation automatically replaces the virtual entry.
const virtualMethods = JSON.parse(readFileSync(VIRTUAL_PATH, 'utf8'));
const extractedNames = new Set(methods.map(m => m.name));
const merged = [
  ...methods,
  ...virtualMethods.filter(v => !extractedNames.has(v.name)),
];

const VALID_GROUPS = new Set(JSON.parse(readFileSync(GROUPS_PATH, 'utf8')));

const ungrouped = merged.filter(m => !m.group).map(m => m.name);
if (ungrouped.length > 0) {
  process.stderr.write(
    `\nWARNING: ${ungrouped.length} method(s) missing @group tag — they will not appear in the sidebar:\n` +
    ungrouped.map(n => `  - ${n}`).join('\n') + '\n\n'
  );
}

const unknownGroup = merged.filter(m => m.group && !VALID_GROUPS.has(m.group));
if (unknownGroup.length > 0) {
  process.stderr.write(
    `\nWARNING: ${unknownGroup.length} method(s) have an unrecognized @group — they will not appear in the sidebar:\n` +
    unknownGroup.map(m => `  - ${m.name} (@group ${m.group})`).join('\n') + '\n\n'
  );
}

// Warn about documented functions missing from FAB_PARAM_NAMES (no friendly validation errors for callers).
const libSource = readFileSync(LIB_PATH, 'utf8');
const fabParamBlock = libSource.match(/const FAB_PARAM_NAMES\s*=\s*Object\.freeze\(\{([\s\S]*?)\}\)/)?.[1] ?? '';
const fabParamNames = new Set(
  [...fabParamBlock.matchAll(/^\s*(\w+)\s*:/gm)].map(m => m[1])
);
const missingFromParams = merged.filter(m => m.kind === 'function' && !fabParamNames.has(m.name)).map(m => m.name);
if (missingFromParams.length > 0) {
  process.stderr.write(
    `\nWARNING: ${missingFromParams.length} documented function(s) missing from FAB_PARAM_NAMES:\n` +
    missingFromParams.map(n => `  - ${n}`).join('\n') + '\n\n'
  );
}

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2));

console.log(`Extracted ${methods.length} entries + ${virtualMethods.length} virtual → ${OUT_PATH}`);
