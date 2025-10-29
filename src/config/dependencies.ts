/**
 * Configuration for required dependencies
 */
export const REQUIRED_DEPENDENCIES = {
    // Core dependencies
    runtime: [
        'hono',
        '@tanstack/react-query',
    ],
    // React dependencies
    react: [
        'react',
        'react-dom',
    ],
    // Optional but recommended
    optional: [
        'zod',
        '@tanstack/react-table',
    ],
};

/**
 * Get all required dependencies as a flat array
 */
export function getAllRequiredDependencies(): string[] {
    return [
        ...REQUIRED_DEPENDENCIES.runtime,
        ...REQUIRED_DEPENDENCIES.react,
    ];
}

/**
 * Get all dependencies including optional ones
 */
export function getAllDependencies(): string[] {
    return [
        ...getAllRequiredDependencies(),
        ...REQUIRED_DEPENDENCIES.optional,
    ];
}
