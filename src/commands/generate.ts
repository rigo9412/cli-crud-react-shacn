import { generateHook } from '../generators/hookGenerator';
import { generateComponent } from '../generators/componentGenerator';
import { generateType } from '../generators/typeGenerator';
import { parseModel } from '../parsers/zodParser';
import { readFileSync } from 'fs';
import { join } from 'path';
import { generateHookBase } from '../generators/hookGeneratorBase';
import { generateComponentBase } from '../generators/componentGeneratorBase';

export const generateCRUD = (modelName: string) => {
    const modelPath = join(__dirname, '../../models', `${modelName}.model.ts`);
    const modelData = readFileSync(modelPath, 'utf-8');
    const parsedModel = parseModel(modelData);

    generateHookBase('use-modal', modelName, parsedModel);
    generateHookBase('use-table-filters', modelName, parsedModel);

    generateComponentBase('button', modelName, `src/components`);
    generateComponentBase('dialog-form', modelName, `src/components`);
    generateComponentBase('dialog', modelName, `src/components`);

    // Generate hooks
    generateHook('use-create', modelName, parsedModel);
    generateHook('use-delete', modelName, parsedModel);
    generateHook('use-update', modelName, parsedModel);
    generateHook('use-get', modelName, parsedModel);
    generateHook('use-get', modelName, parsedModel);
    generateHook('use-get-by-id', modelName, parsedModel);
 

    // Generate components
    generateComponent('columns', modelName, parsedModel);
    generateComponent('form', modelName, parsedModel);
    generateComponent('detail', modelName, parsedModel);
    generateComponent('modal-edit', modelName, parsedModel);
    generateComponent('modal-create', modelName, parsedModel);
    generateComponent('modal-delete', modelName, parsedModel);
    generateComponent('table', modelName, parsedModel);
    

    // Generate types
    generateType(modelName, parsedModel);
};