const fs = require('fs');
const path = require('path');

const files = [
    { src: 'favicon.svg', dest: 'favicon.png' },
    { src: 'logo.svg', dest: 'logo.png' },
    { src: 'typo_logo.svg', dest: 'typo_logo.png' }
];

const baseDir = path.join(process.cwd(), 'public', 'images');

console.log(`Base directory: ${baseDir}`);

files.forEach(file => {
    const srcPath = path.join(baseDir, file.src);
    const destPath = path.join(baseDir, file.dest);

    console.log(`\nProcessing ${file.src}...`);
    try {
        if (!fs.existsSync(srcPath)) {
            console.error(`Source file does not exist: ${srcPath}`);
            return;
        }

        const content = fs.readFileSync(srcPath, 'utf8');
        console.log(`File size: ${content.length} characters`);

        const pattern = /data:image\/png;base64,([^"'>\s]+)/;
        const match = content.match(pattern);

        if (match && match[1]) {
            console.log(`Found base64 data, length: ${match[1].length}`);
            // Remove any whitespace from matches
            const cleanBase64 = match[1].replace(/[\n\r\s]/g, '');
            const buffer = Buffer.from(cleanBase64, 'base64');
            fs.writeFileSync(destPath, buffer);
            console.log(`Successfully saved ${file.dest} (${buffer.length} bytes) to ${destPath}`);

            // Verify write
            if (fs.existsSync(destPath)) {
                console.log(`Verified: ${file.dest} exists on disk.`);
            } else {
                console.error(`ERROR: ${file.dest} was NOT saved correctly even though writeFileSync returned.`);
            }
        } else {
            console.error(`Could not find base64 PNG data in ${file.src} using regex.`);
            // Fallback: simple string search
            const searchStr = 'data:image/png;base64,';
            const index = content.indexOf(searchStr);
            if (index !== -1) {
                console.log(`Fallback: Found search string at index ${index}`);
                let end = content.indexOf('"', index);
                if (end === -1) end = content.indexOf("'", index);
                if (end !== -1) {
                    const base64 = content.substring(index + searchStr.length, end);
                    const cleanBase64 = base64.replace(/[\n\r\s]/g, '');
                    const buffer = Buffer.from(cleanBase64, 'base64');
                    fs.writeFileSync(destPath, buffer);
                    console.log(`Successfully saved via fallback: ${file.dest} (${buffer.length} bytes)`);
                }
            }
        }
    } catch (err) {
        console.error(`Error processing ${file.src}:`, err);
    }
});
console.log("\nDone.");
