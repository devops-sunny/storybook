#!/usr/bin/env node

import { $ } from 'zx';
import calver from 'calver';
import { execSync } from 'child_process'; 
import yargs from 'yargs';
import fs from 'fs';
import path from 'path';

$.verbose = false;

function run() {
  const argv = yargs(process.argv.slice(2))
    .usage('Usage: yarn run generate:buildInfo -p packageName [options]')
    .demandOption(['p'])
    .options({
      'p':{
        alias: 'packageName',
        describe: 'Package name build info is being generated for',
        choices: ['order', 'pickup', 'marquee'],
      },
      'o':{
        describe: 'Array of paths and names for outfiles',
        alias: 'outFiles',
        type: 'array'
      },
      'b': {
        describe: 'Build number',
        alias: 'buildNumber',
        type: 'string'
      }
    })
    .argv;

  const packageName = argv.p;
  const outFiles = argv.o;
  const build = argv.b?.toString();

  const format = 'yyyy.ww.minor';
  const builtAt = new Date();

  const currentCommitHash = execSync(`git rev-parse HEAD`).toString().trim();
  const [, currentTag] = execSync(
    `git name-rev --tags --name-only --refs "${packageName}/*" ${currentCommitHash}`,
  )
    .toString()
    .trim()
    .replace(/\^(\d+)$/, '')
    .replace('v','')
    .split('/');

  const [, lastTag] = execSync(
    `git for-each-ref --sort=-creatordate --format '%(tag)' --count 1 refs/tags/${packageName}`,
  )
    .toString()
    .trim()
    .replace('v', '')
    .split('/');

  var version;
  (currentTag === lastTag) ?
    version = calver.valid(format, currentTag) :
    version = calver.inc(format, lastTag, 'minor');

  const tag = execSync(`git describe --always --match "${packageName}/*"`).toString().trim();
  const branch = execSync('git branch --show-current').toString().trim();
  const commit = execSync('git rev-parse HEAD').toString().trim();

  const buildInfoJson = JSON.stringify({
    version,
    tag,
    branch,
    commit,
    timestamp: builtAt.toISOString(),
    build,
  });

  if (outFiles) {
    outFiles.forEach((outFile) => {
      const fullOutFiles = path.resolve(process.cwd(), 'clients', packageName, outFile);

      fs.mkdirSync(path.dirname(fullOutFiles), { recursive: true });
      fs.writeFileSync(fullOutFiles, buildInfoJson);
    });
  }

  $`echo ${buildInfoJson}`.pipe(process.stdout);
}

run();
