const fs = require('fs');
const path = require('path');

const directoryToSearch = path.resolve(__dirname, '..');

const excludeDirs = ['.git', 'node_modules', '.next', 'build', 'out', 'coverage'];

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        if (excludeDirs.includes(file)) continue;

        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            walkAndReplace(filePath);
        } else {
            // Only modify relevant text files
            const ext = path.extname(filePath);
            const validExts = ['.js', '.jsx', '.ts', '.tsx', '.json', '.xml', '.txt', '.css', '.md'];
            if (!validExts.includes(ext) && ext !== '') continue;
            if (file === 'package-lock.json' || file === 'rename.js') continue;

            try {
                let content = fs.readFileSync(filePath, 'utf8');
                let newContent = content
                    .replace(/PageLending/g, 'FinSmart')
                    .replace(/pagelending/g, 'finsmart')
                    .replace(/Page lending/gi, 'FinSmart');

                if (content !== newContent) {
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    console.log(`Updated: ${filePath}`);
                }
            } catch (e) {
                // ignore
            }
        }
    }
}

walkAndReplace(directoryToSearch);
console.log('Done replacing names.');
