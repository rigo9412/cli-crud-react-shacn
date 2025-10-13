import fs from 'fs';
import path from 'path';

export const readFile = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

export const writeFile = (filePath: string, content: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, 'utf-8', (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export const ensureDirectoryExistence = (filePath: string): void => {
    const dir = path.dirname(filePath);
    if (fs.existsSync(dir)) {
        return;
    }
    ensureDirectoryExistence(dir);
    fs.mkdirSync(dir);
};