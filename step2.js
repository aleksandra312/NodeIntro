const fs = require('fs');
const axios = require('axios');

const cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file ${path}:`, err);
            process.kill(1);
        }
        console.log('Successfully reading file:', data);
    });
};

const webCat = (url) => {
    axios.get(url).then((response) => console.log(response)).catch((err) => {
        console.log(`Error catching ${url}`, err);
    });
};

const callCat = () => {
    const param = process.argv[2];
    console.log(param);

    if (param.startsWith('https://')) {
        webCat(param);
    } else {
        cat(param);
    }
};

callCat();