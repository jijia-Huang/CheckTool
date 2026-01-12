const { build } = require('esbuild');
const path = require('path');

build({
  entryPoints: [path.resolve(__dirname, '../electron/preload.ts')],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: path.resolve(__dirname, '../dist-electron/preload.js'),
  format: 'cjs',
  external: ['electron'],
}).catch(() => process.exit(1));
