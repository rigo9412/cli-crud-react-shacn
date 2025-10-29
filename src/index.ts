import { Command } from 'commander';
import { initProject } from './commands/init';
import { generateCRUD } from './commands/generate';

const program = new Command();

program
  .version('1.0.0')
  .description('CLI tool for generating CRUD components, hooks, and types');

program
  .command('init')
  .description('Initialize a new project structure')
  .action(initProject);

program
  .command('generate <name>')
  .description('Generate CRUD components, hooks, and types for a given name')
  .option('--skip-install', 'Skip automatic dependency installation')
  .action((name, options) => {
    generateCRUD(name, options.skipInstall || false);
  });

program.parse(process.argv);