import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { getModelNameVariations } from '../utils/nameTransformers';

export function generateConstants(modelName: string) {
    const nameVariations = getModelNameVariations(modelName);
    const upperCaseName = nameVariations.modelNameUpperCase;

    const content = `
export const KEY_${upperCaseName} = '${nameVariations.modelNameKebabCase}';
export const KEY_FORM_${upperCaseName}_CREATE = 'create-${nameVariations.modelNameKebabCase}';
export const KEY_FORM_${upperCaseName}_UPDATE = 'update-${nameVariations.modelNameKebabCase}';
export const KEY_MODAL_${upperCaseName}_DELETE = 'delete-${nameVariations.modelNameKebabCase}';
`;

    const outputDir = join(process.cwd(), `src/features/${modelName}/constants`);
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, 'index.ts');
    writeFileSync(outputPath, content.trim());
    console.log(`  ✓ Generated: ${outputPath}`);
}
