import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { expect, test } from 'vitest';

const projectRoot = join(process.cwd());
const sourceRoots = ['index.html', 'src'];
const extensions = new Set(['.css', '.html', '.js', '.jsx', '.json']);

function collectFiles(relativePath) {
  const absolutePath = join(projectRoot, relativePath);
  if (statSync(absolutePath).isFile()) return [absolutePath];

  return readdirSync(absolutePath, { withFileTypes: true }).flatMap((entry) => {
    const child = join(relativePath, entry.name);
    if (entry.isDirectory()) return collectFiles(child);
    return extensions.has(child.slice(child.lastIndexOf('.'))) ? [join(projectRoot, child)] : [];
  });
}

test('source files do not contain common Vietnamese mojibake markers', () => {
  const mojibake = new RegExp(
    `[${String.fromCodePoint(0xc3, 0xc2, 0xc4)}][\\u0080-\\u00ff]|${String.fromCodePoint(0xe1, 0xbb)}|${String.fromCodePoint(0xe2)}[\\u0080-\\u00ff]`,
    'u',
  );
  const offenders = sourceRoots
    .flatMap(collectFiles)
    .filter((filePath) => mojibake.test(readFileSync(filePath, 'utf8')))
    .map((filePath) => relative(projectRoot, filePath));

  expect(offenders).toEqual([]);
});

test('the document declares UTF-8 before application content', () => {
  const html = readFileSync(join(projectRoot, 'index.html'), 'utf8');
  expect(html.indexOf('<meta charset="UTF-8"')).toBeGreaterThanOrEqual(0);
  expect(html.indexOf('<meta charset="UTF-8"')).toBeLessThan(html.indexOf('<title>'));
});
