const fs = require('fs');

const cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file ${path}:`, err);
            process.kill(1);
        }
        console.log('Successfully reading file:', data);
    });
};

cat('one.txt');