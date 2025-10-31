import fs from 'fs';
import path from 'path';
import { renderTemplate } from '../utils/templateEngine';
import { getModelNameVariations } from '../utils/nameTransformers';


export const generateHookBase = (hookName: string, modelName: string, parsedModel: {   name: string; }) => {
    try {
        const templatesDir = path.join(__dirname, '../templates/hooks');
        const outputDir = path.join(process.cwd(), 'src/hooks');

        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Map hook names to their template files
        const templateMap: Record<string, string> = {
            'use-modal': 'use-modal.ts.template',
            'use-table-filters': 'use-table-filters.ts.template',
        };

        const templateFile = templateMap[hookName];
        
        if (!templateFile) {
            console.warn(`  ⚠️  Warning: No template found for hook: ${hookName}`);
            return;
        }

        const templatePath = path.join(templatesDir, templateFile);
        
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template file not found: ${templatePath}`);
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
        console.log(`  ✓ Generated: ${outputPath}`);
        
    } catch (error) {
        console.error(`  ✗ Error generating hook ${hookName}:`, error);
        throw error;
    }
};