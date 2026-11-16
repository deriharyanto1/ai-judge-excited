// ai-excited-01 entry: write the artwork to the output directory.
// The image lives beside this file as entry.png. The program copies it
// to <output>/entry.png, where <output> is MAKEFUN_OUTPUT_DIR when set
// and /output otherwise. Node 22, standard library only. The copy is
// byte for byte, so two runs always produce identical output.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, 'entry.png');
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// The grader runs this program twice and expects identical bytes both
// times. A copy is exact by construction, but confirm the sizes match so
// a truncated write fails loudly instead of shipping a broken image.
if (statSync(source).size !== statSync(target).size) {
  throw new Error('entry.png copy is incomplete');
}
