import fs from 'fs';
import path from 'path';

/**
 * Renders a template by replacing placeholders with provided data
 * @param templateContent - The template string content (not a path)
 * @param data - Object containing replacement values
 * @returns Rendered template string
 */
export const renderTemplate = (templateContent: string, data: Record<string, any>): string => {
    try {
        return Object.keys(data).reduce((result, key) => {
            // Handle nested objects by converting to JSON string for simple cases
            const value = typeof data[key] === 'object' 
                ? JSON.stringify(data[key], null, 2)
                : String(data[key]);
            
            // Replace both {{key}} and {{ key }} patterns
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            return result.replace(regex, value);
        }, templateContent);
    } catch (error) {
        console.error('Error rendering template:', error);
        throw new Error(`Failed to render template: ${error instanceof Error ? error.message : String(error)}`);
    }
};

/**
 * Legacy function that reads template from file path and renders it
 * @deprecated Use renderTemplate with file content instead
 */
export const renderTemplateFromFile = (templatePath: string, data: Record<string, any>): string => {
    if (!fs.existsSync(templatePath)) {
        throw new Error(`Template file not found: ${templatePath}`);
    }
    
    const template = fs.readFileSync(templatePath, 'utf-8');
    return renderTemplate(template, data);
};