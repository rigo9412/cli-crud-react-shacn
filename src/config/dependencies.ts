/**
 * Configuration for required dependencies
 */
export const REQUIRED_DEPENDENCIES = {
    // Core dependencies
    runtime: [
        'hono',
        '@tanstack/react-query',
        'sonner',
        'react-hook-form',
        '@hookform/resolvers',
        'lucide-react',
        'class-variance-authority',
        "@radix-ui/react-select",
        'clsx',
        'tailwind-merge',
        'dayjs',
        'nuqs',
        'next-intl',
        'clsx',
        'tailwind-merge',
        'zod',
        '@tanstack/react-table',
        "@radix-ui/react-slot",
        "class-variance-authority",
        "toast"
    ],
    // React dependencies
    react: [
        'react',
        'react-dom',
    ],
    // Optional but recommended
    optional: [
      
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
