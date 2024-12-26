import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const typeFiles = {
    'scss': {
        format: 'scss',
    },
    'hbs?raw': {
        format: 'hbs?raw'
    },
    'hbs': {
        format: 'hbs'
    },
    'webp': {
        format: 'image/webp'
    }
};

export async function resolve(specifier, context, next) {
    const nextResult = await next(specifier, context);

    const extension = specifier.split('.').pop();

    if (typeFiles[extension]) {
        return {
            format: typeFiles[extension].format,
            shortCircuit: true,
            url: nextResult.url,
        };
    }

    return nextResult;
}

export async function load(url, context, next) {
    const extension = url.split('.').pop();

    if (typeFiles[extension]) {
        const rawSource = '' + await fs.readFile(fileURLToPath(url));

        if (extension === 'scss') {
            return {
                format: 'module',
                shortCircuit: true,
                source: `export default ${JSON.stringify(rawSource)}`,
            };
        }
        if (extension === 'hbs?raw') {
            return {
                format: 'module',
                shortCircuit: true,
                source: `export default ${JSON.stringify(rawSource)}`,
            };
        }
    }

    return next(url, context);
}
