import { readFileSync } from 'fs';
import { join } from 'path';

export function generateType(modelName: string, parsedModel: { id: string; name: string; }): string {
    const templatePath = join(__dirname, '../templates/types/index.ts.template');
    const template = readFileSync(templatePath, 'utf-8');

    return template.replace(/{{modelName}}/g, modelName);
}