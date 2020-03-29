#!/usr/bin/env node

const { createCommand } = require('commander');
const { managePipeline } = require('../lib/stream-manager');
const { actionTypeValidator } = require('../lib/validator');

const program = createCommand();

program
  .version('1.0.0')
  .requiredOption('-s, --shift <shift>', 'cipher shift', parseInt)
  .requiredOption(
    '-a, --action <action>',
    'action encode/decode',
    actionTypeValidator
  )
  .option('-i, --input <input>', 'input file')
  .option('-o, --output <output>', 'output file');

program.parse(process.argv);

run(program.shift, program.action, program.input, program.output).catch(err =>
  console.error('Pipeline failed.', err)
);

/**
 * Run command
 *
 * @param {Integer} shift
 * @param {String} action
 * @param {String|undefined} input
 * @param {String|undefined} output
 */
async function run(shift, action, input, output) {
  await managePipeline(shift, action, input, output);
  console.log('Pipeline succeeded.');
}
