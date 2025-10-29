import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

/**
 * Detects which package manager is being used in the project
 */
export function detectPackageManager(): PackageManager {
    const cwd = process.cwd();
    
    if (existsSync(join(cwd, 'bun.lockb'))) {
        return 'bun';
    }
    if (existsSync(join(cwd, 'pnpm-lock.yaml'))) {
        return 'pnpm';
    }
    if (existsSync(join(cwd, 'yarn.lock'))) {
        return 'yarn';
    }
    return 'npm';
}

/**
 * Checks if a package is installed in the project
 */
export function isPackageInstalled(packageName: string): boolean {
    try {
        const cwd = process.cwd();
        const packageJsonPath = join(cwd, 'package.json');
        
        if (!existsSync(packageJsonPath)) {
            return false;
        }
        
        const packageJson = require(packageJsonPath);
        const dependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies,
        };
        
        return packageName in dependencies;
    } catch (error) {
        return false;
    }
}

/**
 * Installs a list of packages using the detected package manager
 */
export function installPackages(packages: string[]): void {
    const packageManager = detectPackageManager();
    const missingPackages = packages.filter(pkg => !isPackageInstalled(pkg));
    
    if (missingPackages.length === 0) {
        console.log('✓ All required packages are already installed');
        return;
    }
    
    console.log(`\n📦 Installing missing packages: ${missingPackages.join(', ')}`);
    console.log(`   Using package manager: ${packageManager}\n`);
    
    try {
        let installCommand: string;
        
        switch (packageManager) {
            case 'bun':
                installCommand = `bun add ${missingPackages.join(' ')}`;
                break;
            case 'pnpm':
                installCommand = `pnpm add ${missingPackages.join(' ')}`;
                break;
            case 'yarn':
                installCommand = `yarn add ${missingPackages.join(' ')}`;
                break;
            case 'npm':
            default:
                installCommand = `npm install ${missingPackages.join(' ')}`;
                break;
        }
        
        console.log(`   Running: ${installCommand}\n`);
        execSync(installCommand, { stdio: 'inherit', cwd: process.cwd() });
        console.log('\n✓ Packages installed successfully\n');
    } catch (error) {
        console.error('\n✗ Error installing packages:', error);
        console.log('\nYou can install them manually by running:');
        console.log(`   ${packageManager} ${packageManager === 'npm' ? 'install' : 'add'} ${missingPackages.join(' ')}\n`);
    }
}

/**
 * Ensures required dependencies are installed
 */
export function ensureDependencies(requiredPackages: string[]): void {
    console.log('\n🔍 Checking required dependencies...\n');
    
    const cwd = process.cwd();
    const packageJsonPath = join(cwd, 'package.json');
    
    if (!existsSync(packageJsonPath)) {
        console.warn('⚠️  Warning: No package.json found in current directory');
        console.log('   Skipping dependency installation\n');
        return;
    }
    
    installPackages(requiredPackages);
}
