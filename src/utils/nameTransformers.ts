/**
 * Utility functions to transform model names into different naming conventions
 */

/**
 * Converts a string to kebab-case
 * Example: "UserProfile" -> "user-profile"
 */
export const toKebabCase = (str: string): string => {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase();
};

/**
 * Converts a string to camelCase
 * Example: "user-profile" -> "userProfile"
 */
export const toCamelCase = (str: string): string => {
    return str
        .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
        .replace(/^(.)/, (char) => char.toLowerCase());
};

/**
 * Converts a string to PascalCase
 * Example: "user-profile" -> "UserProfile"
 */
export const toPascalCase = (str: string): string => {
    const camel = toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
};

/**
 * Converts a string to UPPER_CASE
 * Example: "UserProfile" -> "USER_PROFILE"
 */
export const toUpperCase = (str: string): string => {
    return str
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2')
        .toUpperCase();
};

/**
 * Simple pluralization (add 's' or handle common cases)
 * Example: "User" -> "Users", "Company" -> "Companies"
 */
export const toPlural = (str: string): string => {
    if (str.endsWith('y')) {
        return str.slice(0, -1) + 'ies';
    }
    if (str.endsWith('s') || str.endsWith('x') || str.endsWith('ch') || str.endsWith('sh')) {
        return str + 'es';
    }
    return str + 's';
};

/**
 * Creates a complete set of name variations for a model
 */
export interface ModelNameVariations {
    // Original
    modelName: string;
    
    // Case variations
    modelNamePascalCase: string;
    modelNameCamelCase: string;
    modelNameKebabCase: string;
    modelNameUpperCase: string;
    modelNameSnakeCase: string;
    
    // Plural variations
    modelNamePlural: string;
    modelNamePluralPascalCase: string;
    modelNamePluralCamelCase: string;
    modelNameCamelCasePlural: string;
    modelNameKebabCasePlural: string;
    modelNameUpperCasePlural: string;
}

/**
 * Generate all name variations for a model
 */
export const getModelNameVariations = (modelName: string): ModelNameVariations => {
    const pascalCase = toPascalCase(modelName);
    const camelCase = toCamelCase(modelName);
    const kebabCase = toKebabCase(modelName);
    const upperCase = toUpperCase(modelName);
    const snakeCase = kebabCase.replace(/-/g, '_');
    
    const plural = toPlural(pascalCase);
    const pluralCamel = toCamelCase(plural);
    const pluralKebab = toKebabCase(plural);
    const pluralUpper = toUpperCase(plural);
    
    return {
        modelName: pascalCase,
        modelNamePascalCase: pascalCase,
        modelNameCamelCase: camelCase,
        modelNameKebabCase: kebabCase,
        modelNameUpperCase: upperCase,
        modelNameSnakeCase: snakeCase,
        
        modelNamePlural: plural,
        modelNamePluralPascalCase: plural,
        modelNamePluralCamelCase: pluralCamel,
        modelNameCamelCasePlural: pluralCamel,
        modelNameKebabCasePlural: pluralKebab,
        modelNameUpperCasePlural: pluralUpper,
    };
};
