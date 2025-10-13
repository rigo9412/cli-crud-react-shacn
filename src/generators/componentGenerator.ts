import { renderTemplate } from '../utils/templateEngine';
import { writeFileSync } from 'fs';
import { join } from 'path';

export function generateComponent(componentName: string, model: any, parsedModel: { id: string; name: string; }) {
    const templatesPath = join(__dirname, '../templates/components');
    const componentTemplate = `${componentName}.tsx.template`;
    
    const templateData = {
        componentName,
        model,
    };

    const output = renderTemplate(join(templatesPath, componentTemplate), templateData);
    writeFileSync(join(process.cwd(), 'src/components', `${componentName}.tsx`), output);
}