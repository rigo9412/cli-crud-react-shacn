import { promises as fs } from 'fs';
import path from 'path';

export async function initProject(projectName: string) {
    const baseDir = path.resolve(process.cwd(), projectName);

    const directories = [
        'src',
        'src/commands',
        'src/templates',
        'src/templates/hooks',
        'src/templates/components',
        'src/templates/types',
        'src/generators',
        'src/parsers',
        'src/utils',
        'models',
        'bin',
    ];

    const files = [
        { path: 'src/index.ts', content: '// Entry point of the CLI application' },
        { path: 'src/commands/generate.ts', content: '// Command to generate CRUD components' },
        { path: 'src/commands/init.ts', content: '// Command to initialize a new project structure' },
        { path: 'src/templates/hooks/useFetch.ts.template', content: '// Template for useFetch hook' },
        { path: 'src/templates/hooks/useCreate.ts.template', content: '// Template for useCreate hook' },
        { path: 'src/templates/hooks/useUpdate.ts.template', content: '// Template for useUpdate hook' },
        { path: 'src/templates/hooks/useDelete.ts.template', content: '// Template for useDelete hook' },
        { path: 'src/templates/components/List.tsx.template', content: '// Template for List component' },
        { path: 'src/templates/components/Form.tsx.template', content: '// Template for Form component' },
        { path: 'src/templates/components/Detail.tsx.template', content: '// Template for Detail component' },
        { path: 'src/templates/components/DeleteDialog.tsx.template', content: '// Template for DeleteDialog component' },
        { path: 'src/templates/types/index.ts.template', content: '// Template for TypeScript types' },
        { path: 'src/generators/hookGenerator.ts', content: '// Hook generator function' },
        { path: 'src/generators/componentGenerator.ts', content: '// Component generator function' },
        { path: 'src/generators/typeGenerator.ts', content: '// Type generator function' },
        { path: 'src/parsers/zodParser.ts', content: '// Zod parser function' },
        { path: 'src/utils/fileManager.ts', content: '// File management utilities' },
        { path: 'src/utils/templateEngine.ts', content: '// Template rendering engine' },
        { path: 'models/example.model.ts', content: '// Example model using Zod' },
        { path: 'bin/cli.js', content: '// CLI executable script' },
        { path: 'package.json', content: '{}' },
        { path: 'tsconfig.json', content: '{}' },
        { path: 'README.md', content: '# Project Documentation' },
    ];

    await fs.mkdir(baseDir, { recursive: true });

    for (const dir of directories) {
        await fs.mkdir(path.join(baseDir, dir), { recursive: true });
    }

    for (const file of files) {
        await fs.writeFile(path.join(baseDir, file.path), file.content);
    }

    console.log(`Project ${projectName} initialized successfully.`);
}