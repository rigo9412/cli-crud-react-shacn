import * as Handlebars from 'handlebars';

/**
 * Renders a template by replacing placeholders with provided data using Handlebars
 * @param templateContent - The template string content (not a path)
 * @param data - Object containing replacement values
 * @returns Rendered template string
 */
export const renderTemplate = (templateContent: string, data: Record<string, any>): string => {
    try {
        const template = Handlebars.compile(templateContent);
        return template(data);
    } catch (error) {
        console.error('Error rendering template:', error);
        throw new Error(`Failed to render template: ${error instanceof Error ? error.message : String(error)}`);
    }
};
