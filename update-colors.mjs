import fs from 'fs';
import path from 'path';

const componentsDir = './src/components';
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { match: /\bbg-slate-950\/50\b/g, replace: 'bg-white' },
  { match: /\bbg-slate-900\/50\b/g, replace: 'bg-white' },
  { match: /\bbg-slate-900\/40\b/g, replace: 'bg-white' },
  { match: /\bbg-slate-900\/30\b/g, replace: 'bg-slate-50' },
  { match: /\bbg-slate-950\b/g, replace: 'bg-white' },
  { match: /\bbg-slate-900\b/g, replace: 'bg-white' },
  { match: /\bbg-slate-800\/50\b/g, replace: 'bg-slate-50' },
  { match: /\bbg-slate-800\b/g, replace: 'bg-slate-100' },
  { match: /\bbg-white\/5\b/g, replace: 'bg-slate-50' },
  { match: /\bbg-white\/10\b/g, replace: 'bg-slate-100' },
  { match: /\bbg-white\/20\b/g, replace: 'bg-slate-200' },
  { match: /\bbg-black\b/g, replace: 'bg-white' },
  { match: /\btext-white\b/g, replace: 'text-slate-900' },
  { match: /\btext-slate-400\b/g, replace: 'text-slate-600' },
  { match: /\btext-slate-300\b/g, replace: 'text-slate-700' },
  { match: /\btext-slate-500\b/g, replace: 'text-slate-500' }, // keep
  { match: /\bborder-white\/5\b/g, replace: 'border-slate-200' },
  { match: /\bborder-white\/10\b/g, replace: 'border-slate-200' },
  { match: /\bborder-white\/20\b/g, replace: 'border-slate-300' },
  { match: /\bshadow-2xl\b/g, replace: 'shadow-md' },
  { match: /\bshadow-lg\b/g, replace: 'shadow-sm' },
];

for (const file of files) {
  if (['Header.tsx', 'Footer.tsx'].includes(file)) continue;
  
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  for (const { match, replace } of replacements) {
    content = content.replace(match, replace);
  }

  fs.writeFileSync(filePath, content);
}
console.log('Done mapping light mode classes.');
