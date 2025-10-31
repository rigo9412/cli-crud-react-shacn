import { renderTemplate } from '../utils/templateEngine';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { getModelNameVariations } from '../utils/nameTransformers';

export function generateComponent(componentName: string, modelName: string, parsedModel: {   name: string; }) {
    try {
        const templatesPath = join(__dirname, '../templates/components');
        const componentTemplate = `${componentName}.tsx.template`;
        const templateFullPath = join(templatesPath, componentTemplate);
        
        if (!existsSync(templateFullPath)) {
            console.warn(`  ⚠️  Warning: Template not found: ${templateFullPath}`);
            return;
        }

        // Get all name variations for template replacement
        const nameVariations = getModelNameVariations(modelName);

        const templateData = {
            componentName,
            ...nameVariations,
            parsedModel,
        };

        const outputDir = join(process.cwd(), `src/features/${modelName}/components`);
        
        // Ensure output directory exists
        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true });
        }

        const templateContent = readFileSync(templateFullPath, 'utf-8');
        const output = renderTemplate(templateContent, templateData);
        const outputFilePath = join(outputDir, `${componentName}.tsx`);
        
        writeFileSync(outputFilePath, output);
        console.log(`  ✓ Generated: ${componentName}.tsx`);
        
    } catch (error) {
        console.error(`  ✗ Error generating component ${componentName}:`, error);
        throw error;
    }
}