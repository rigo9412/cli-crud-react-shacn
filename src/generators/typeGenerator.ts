import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { renderTemplate } from '../utils/templateEngine';
import { getModelNameVariations } from '../utils/nameTransformers';
import { ParsedModel } from '../parsers/zodParser';

export function generateType(modelName: string, parsedModel: ParsedModel): void {
    const templatePath = join(__dirname, '../templates/types/index.ts.template');
    const template = readFileSync(templatePath, 'utf-8');

    // Get all name variations for template replacement
    const nameVariations = getModelNameVariations(modelName);

    const content = renderTemplate(template, {
        ...nameVariations,
        fields: parsedModel.fields,
    });

    const outputDir = join(process.cwd(), `src/features/${modelName}/types`);
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, 'index.ts');
    writeFileSync(outputPath, content);
    console.log(`  ✓ Generated: ${outputPath}`);
}