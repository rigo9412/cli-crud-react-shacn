import fs from 'fs';
import path from 'path';
import { renderTemplate } from '../utils/templateEngine';

export const generateHookBase = (hookName: string, modelName: string, parsedModel: { id: string; name: string; }) => {
    const templatesDir = path.join(__dirname, '../templates/hooks');
    const outputDir = path.join(process.cwd(), 'src/hooks');

    const templateFiles = [
        'use-modal.ts.template',
        'use-table-filters.ts.template',
    ];

    templateFiles.forEach(templateFile => {
        const templatePath = path.join(templatesDir, templateFile);
        const outputPath = path.join(outputDir, `${hookName}${templateFile.replace('.template', '.ts')}`);

        const templateContent = fs.readFileSync(templatePath, 'utf-8');
        const renderedContent = renderTemplate(templateContent, { hookName, modelName });

        fs.writeFileSync(outputPath, renderedContent);
    });
};