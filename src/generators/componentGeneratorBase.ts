import { renderTemplate } from '../utils/templateEngine';
import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';

export function generateComponentBase(componentName: string, modelName: string, outputPath: string) {
    try {
        const templatesPath = join(__dirname, '../templates/base');
        const componentTemplate = `${componentName}.tsx.template`;
        const templateFullPath = join(templatesPath, componentTemplate);
        
        if (!existsSync(templateFullPath)) {
            console.warn(`  ⚠️  Warning: Template not found: ${templateFullPath}`);
            return;
        }

        const templateData = {
            componentName,
            modelName,
        };

        const fullOutputPath = join(process.cwd(), outputPath);
        
        // Ensure output directory exists
        if (!existsSync(fullOutputPath)) {
            mkdirSync(fullOutputPath, { recursive: true });
        }

        const templateContent = readFileSync(templateFullPath, 'utf-8');
        const output = renderTemplate(templateContent, templateData);
        const outputFilePath = join(fullOutputPath, `${componentName}.tsx`);
        
        writeFileSync(outputFilePath, output);
        console.log(`  ✓ Generated: ${componentName}.tsx`);
        
    } catch (error) {
        console.error(`  ✗ Error generating component ${componentName}:`, error);
        throw error;
    }
}