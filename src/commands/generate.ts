import { generateHook } from '../generators/hookGenerator';
import { generateComponent } from '../generators/componentGenerator';
import { generateType } from '../generators/typeGenerator';
import { parseModel } from '../parsers/zodParser';
import { readFileSync } from 'fs';
import { join } from 'path';

export const generateCRUD = (modelName: string) => {
    const modelPath = join(__dirname, '../../models', `${modelName}.model.ts`);
    const modelData = readFileSync(modelPath, 'utf-8');
    const parsedModel = parseModel(modelData);

    // Generate hooks
    generateHook('useFetch', modelName, parsedModel);
    generateHook('useCreate', modelName, parsedModel);
    generateHook('useUpdate', modelName, parsedModel);
    generateHook('useDelete', modelName, parsedModel);

    // Generate components
    generateComponent('List', modelName, parsedModel);
    generateComponent('Form', modelName, parsedModel);
    generateComponent('Detail', modelName, parsedModel);
    generateComponent('DeleteDialog', modelName, parsedModel);

    // Generate types
    generateType(modelName, parsedModel);
};