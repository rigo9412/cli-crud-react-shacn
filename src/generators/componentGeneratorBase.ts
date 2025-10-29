import { renderTemplate } from '../utils/templateEngine';
import { writeFileSync } from 'fs';
import { join } from 'path';

export function generateComponentBase(componentName: string, model: any,path: string,) {
    const templatesPath = join(__dirname, '../templates/components');
    const componentTemplate = `${componentName}.tsx.template`;
    
    const templateData = {
        componentName,
        model,
    };

    const outputPath = join(process.cwd(), path ? `${path}/${componentName}` : `src/components/${componentName}`);
    const output = renderTemplate(join(templatesPath, componentTemplate), templateData);
    writeFileSync(join(outputPath, `${componentName}.tsx`), output);
}