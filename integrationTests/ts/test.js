'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const { dependencies } = require('./package.json');

const tsVersions = Object.keys(dependencies)
  .filter((pkg) => pkg.startsWith('typescript-'))
  .sort((a, b) => b.localeCompare(a));

for (const version of tsVersions) {
  console.log(`Testing on ${version} ...`);

  const tscPath = path.join(__dirname, 'node_modules', version, 'bin/tsc');
  fs.chmodSync(tscPath, 0o755);
  childProcess.execSync(tscPath, { stdio: 'inherit' });
}
