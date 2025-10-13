import fs from 'fs';
import path from 'path';

export const renderTemplate = (templateName: string, data: Record<string, any>): string => {
    const templatePath = path.resolve(__dirname, '../templates', templateName);
    const template = fs.readFileSync(templatePath, 'utf-8');

    return Object.keys(data).reduce((result, key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        return result.replace(regex, data[key]);
    }, template);
};