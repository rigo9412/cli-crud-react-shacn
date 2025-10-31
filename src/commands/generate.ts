import { generateHook } from '../generators/hookGenerator';
import { generateComponent } from '../generators/componentGenerator';
import { generateType } from '../generators/typeGenerator';
import { parseModel } from '../parsers/zodParser';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { generateHookBase } from '../generators/hookGeneratorBase';
import { generateComponentBase } from '../generators/componentGeneratorBase';
import { ensureDependencies } from '../utils/dependencyManager';
import { getAllRequiredDependencies } from '../config/dependencies';
import { generateConstants } from '../generators/constantsGenerator';

export const generateCRUD = (modelName: string, skipInstall: boolean = false) => {
    try {
        console.log(`\n🚀 Starting CRUD generation for model: ${modelName}\n`);

        // Ensure required dependencies are installed
        if (!skipInstall) {
            ensureDependencies(getAllRequiredDependencies());
        } else {
            console.log('⏭️  Skipping dependency installation\n');
        }
        
        // Validate model file exists
        const modelPath = join(process.cwd(), 'models', `${modelName}.model.ts`);
        if (!existsSync(modelPath)) {
            throw new Error(`Model file not found: ${modelPath}\nPlease create the model file first.`);
        }

        console.log(`📄 Reading model file: ${modelPath}`);
        const modelData = readFileSync(modelPath, 'utf-8');
        
        console.log('🔍 Parsing model...');
        const parsedModel = parseModel(modelData);
        
        if (!parsedModel) {
            throw new Error('Failed to parse model. Please check your model file format.');
        }

        console.log('\n📝 Generating constants...');
        generateConstants(modelName);

        console.log('\n📝 Generating base hooks...');
        generateHookBase('use-modal', modelName, parsedModel);
        generateHookBase('use-table-filters', modelName, parsedModel);

        console.log('🎨 Generating base components...');
        generateComponentBase('button', modelName, `src/components`);
        generateComponentBase('dialog-form', modelName, `src/components/ui`);
        generateComponentBase('dialog', modelName, `src/ui`);
        generateComponentBase('data-table', modelName, `src/ui`);

        console.log('🔑 Generating constants...');
        generateConstants(modelName);

        console.log('🔗 Generating API hooks...');
        // Generate hooks
        generateHook('use-create', modelName, parsedModel);
        generateHook('use-delete', modelName, parsedModel);
        generateHook('use-update', modelName, parsedModel);
        generateHook('use-get', modelName, parsedModel);
 
        generateHook('use-get-by-id', modelName, parsedModel);
 

        console.log('⚛️  Generating React components...');
        // Generate components
        generateComponent('columns', modelName, parsedModel);
        generateComponent('form', modelName, parsedModel);
        generateComponent('modal-edit', modelName, parsedModel);
        generateComponent('modal-create', modelName, parsedModel);
        generateComponent('modal-delete', modelName, parsedModel);
        generateComponent('table', modelName, parsedModel);
    

        console.log('📦 Generating TypeScript types...');
        // Generate types
        generateType(modelName, parsedModel);

        console.log('\n✅ CRUD generation completed successfully!\n');
        console.log(`📁 Generated files in:`);
        console.log(`   - src/features/${modelName}/`);
        console.log(`   - src/hooks/`);
        console.log(`   - src/components/`);
        console.log(`   - src/ui/\n`);

    } catch (error) {
        console.error('\n❌ Error generating CRUD:\n');
        if (error instanceof Error) {
            console.error(`   ${error.message}\n`);
            if (error.stack) {
                console.error('Stack trace:');
                console.error(error.stack);
            }
        } else {
            console.error(`   ${String(error)}\n`);
        }
        process.exit(1);
    }
};