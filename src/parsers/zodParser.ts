 

export interface ParsedField {
    name: string;
    type: string;
    isOptional: boolean;
    isArray: boolean;
    zodType: string;
    validation?: string;
}

export interface ParsedModel {
    name: string;
    fields: ParsedField[];
}

export const parseModel = (modelContent: string): ParsedModel => {
    // Extract the model name
    const modelNameMatch = modelContent.match(/export const (\w+)Model/);
    if (!modelNameMatch) {
        throw new Error('Could not find model name. Make sure your model exports a constant named <Name>Model');
    }
    const modelName = modelNameMatch[1];

    // Extract the z.object definition
    // Remove newlines temporarily to make regex work without 's' flag
    const singleLineContent = modelContent.replace(/\n/g, ' ');
    const objectMatch = singleLineContent.match(/z\.object\(\{(.+?)\}\)/);
    if (!objectMatch) {
        throw new Error('Could not find z.object definition in model file');
    }

    const fieldsContent = objectMatch[1];
    const fields: ParsedField[] = [];

    // Parse each field line
    const fieldLines = fieldsContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('//'));
    
    for (const line of fieldLines) {
        const fieldMatch = line.match(/(\w+):\s*z\.(\w+)\((.*?)\)(.*)/);
        if (fieldMatch) {
            const [, name, zodType, params, modifiers] = fieldMatch;
            
            const isOptional = modifiers.includes('.optional()');
            const isArray = modifiers.includes('.array()');
            
            // Map Zod types to TypeScript types
            let tsType = 'string';
            switch (zodType) {
                case 'string':
                    tsType = 'string';
                    break;
                case 'number':
                    tsType = 'number';
                    break;
                case 'boolean':
                    tsType = 'boolean';
                    break;
                case 'date':
                    tsType = 'Date';
                    break;
                case 'object':
                    tsType = 'object';
                    break;
                case 'array':
                    tsType = 'any[]';
                    break;
                default:
                    tsType = 'any';
            }

            if (isArray) {
                tsType = `${tsType}[]`;
            }

            fields.push({
                name,
                type: tsType,
                isOptional,
                isArray,
                zodType,
                validation: params || undefined
            });
        }
    }

    if (fields.length === 0) {
        throw new Error('No fields found in model definition');
    }

    return {
        name: modelName,
        fields
    };
};