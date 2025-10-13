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
  .action((name) => {
    generateCRUD(name);
  });

program.parse(process.argv);