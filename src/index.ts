#!/usr/bin/env node

import * as cli from './cli';
import fs from 'fs';
const setup = () => {
  const outFilePath = 'out/newGPX.gpx';

  if (!fs.existsSync(outFilePath)) {
    fs.mkdirSync(outFilePath);
    if (!fs.existsSync) throw new Error('Could not create "out" directory');
  }
};
const main = () => {
  setup();
  cli.start();
};

main();
