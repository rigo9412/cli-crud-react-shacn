import { readFileSync } from 'fs';
import { join } from 'path';
import { renderTemplate } from '../utils/templateEngine';
import { getModelNameVariations } from '../utils/nameTransformers';

export function generateType(modelName: string, parsedModel: {  name: string; }): string {
    const templatePath = join(__dirname, '../templates/types/index.ts.template');
    const template = readFileSync(templatePath, 'utf-8');

    // Get all name variations for template replacement
    const nameVariations = getModelNameVariations(modelName);

    return renderTemplate(template, {
        ...nameVariations,
        parsedModel
    });
}