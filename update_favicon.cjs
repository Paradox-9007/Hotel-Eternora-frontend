const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && file !== 'node_modules') {
            processDir(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let depth = fullPath.split(path.sep).length - path.resolve('d:/CiMSO/Real/frontend').split(path.sep).length;
            let relativePath = depth > 0 ? '../'.repeat(depth) + 'assets/favicon.png' : 'assets/favicon.png';
            
            // Check if favicon already exists
            if (!content.includes('rel="icon"')) {
                // Find </head> or <head> and insert
                content = content.replace('</head>', `    <link rel="icon" type="image/png" href="${relativePath}">\n  </head>`);
                fs.writeFileSync(fullPath, content);
            } else {
                // If it exists, replace it
                content = content.replace(/<link[^>]*rel="icon"[^>]*>/i, `<link rel="icon" type="image/png" href="${relativePath}">`);
                fs.writeFileSync(fullPath, content);
            }
        }
    });
}

processDir('d:/CiMSO/Real/frontend');
console.log('Favicon updated across all HTML files.');
