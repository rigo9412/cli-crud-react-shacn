 

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

export const parseModel = (modelContent: string): ParsedModel | null => {
    // Extract the model name
    const modelNameMatch = modelContent.match(/export const (\w+)Schema/);
    if (!modelNameMatch) {
        throw new Error('Could not find model name. Make sure your model exports a constant named <Name>Schema');
    }
    const modelName = modelNameMatch[1];

    // Extract the z.object definition
    const objectMatch = modelContent.match(/z\.object\(\s*\{([\s\S]+?)\}\s*\)/);
    if (!objectMatch) {
        throw new Error('Could not find z.object definition in model file');
    }

    const fieldsContent = objectMatch[1];
    const fields: ParsedField[] = [];

    // Parse each field line - need to handle nested parentheses and arrow functions
    const fieldLines: string[] = [];
    let currentField = '';
    let depth = 0;
    
    for (let i = 0; i < fieldsContent.length; i++) {
        const char = fieldsContent[i];
        
        if (char === '(') depth++;
        if (char === ')') depth--;
        
        currentField += char;
        
        // Split on commas only when we're at depth 0 (not inside parentheses)
        if (char === ',' && depth === 0) {
            fieldLines.push(currentField.slice(0, -1).trim());
            currentField = '';
        }
    }
    
    // Add the last field
    if (currentField.trim()) {
        fieldLines.push(currentField.trim());
    }
    
    for (const line of fieldLines) {
        if (!line || line.startsWith('//')) continue;
        
        const fieldMatch = line.match(/(\w+):\s*(z\..+)/);

        if (fieldMatch) {
            const [, name, zodChain] = fieldMatch;
            
            const isOptional = zodChain.includes('.optional()');
            const isArray = zodChain.includes('.array()');
            
            // Map Zod types to TypeScript types
            let tsType = 'string';
            let zodType = 'string';
            const typeMatch = zodChain.match(/z\.(\w+)/);
            if (typeMatch) {
                zodType = typeMatch[1];
            }

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
                tsType = `${tsType.replace('[]','')}[]`;
            }

            fields.push({
                name,
                type: tsType,
                isOptional,
                isArray,
                zodType,
                validation: zodChain
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