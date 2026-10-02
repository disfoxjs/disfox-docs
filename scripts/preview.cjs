// Production preview; accepts the preview runner's host/port flags.
const {spawn} = require('node:child_process');
const args = process.argv.slice(2).filter((arg) => arg !== '--strictPort');
const child = spawn(process.execPath, [require.resolve('@docusaurus/core/bin/docusaurus.mjs'), 'serve', '--no-open', ...args], {stdio: 'inherit'});
child.on('exit', (code) => process.exit(code ?? 1));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
