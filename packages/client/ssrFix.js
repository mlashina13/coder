import fs from 'fs';

// Обходной путь для фикса проблемы с TextEncoder в SSR
fs.readFile('ssr-dist/ssr.cjs', 'utf8', (readError, data) => {
  if (readError) {
    throw readError;
  } 
  const regex = /new\s+\w+\.TextEncoder\(\)/g;
  const fixed = data.replace(regex, 'new global.TextEncoder()');
  fs.writeFile('ssr-dist/ssr.cjs', fixed, (writeError) => {
    if (writeError) {
      throw writeError;
    }
    console.log('SSR module fixed!');
  });
});
