// The "build" step: put what we want to ship into a dist folder.

const fs = require('fs');

fs.rmSync('dist', { recursive: true, force: true });   // always start from a clean folder
fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('index.html', 'dist/index.html');

console.log('Build done -> dist/index.html');
