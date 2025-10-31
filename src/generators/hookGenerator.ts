import fs from 'fs';
import path from 'path';
import { renderTemplate } from '../utils/templateEngine';
import { getModelNameVariations } from '../utils/nameTransformers';

export const generateHook = (hookName: string, modelName: string, parsedModel: {   name: string; }) => {
    try {
        const templatesDir = path.join(__dirname, '../templates/hooks');
        const outputDir = path.join(process.cwd(), `src/features/${modelName}/api`);

        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Map each hook to its specific template
        const templateFile = `${hookName}.ts.template`;
        const templatePath = path.join(templatesDir, templateFile);
        
        if (!fs.existsSync(templatePath)) {
            console.warn(`  ⚠️  Warning: Template not found for ${hookName}: ${templatePath}`);
            return;
        }

        const outputPath = path.join(outputDir, `${hookName}.ts`);

        // Get all name variations for template replacement
        const nameVariations = getModelNameVariations(modelName);

        const templateContent = fs.readFileSync(templatePath, 'utf-8');
        const renderedContent = renderTemplate(templateContent, { 
            hookName, 
            ...nameVariations, 
            parsedModel 
        });

        fs.writeFileSync(outputPath, renderedContent);
        console.log(`  ✓ Generated: ${hookName}.ts`);
        
    } catch (error) {
        console.error(`  ✗ Error generating hook ${hookName}:`, error);
        throw error;
    }
};