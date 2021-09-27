const fs = require('fs');
const axios = require('axios');

const cat = (path, fileOut) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file ${path}:`, err);
            process.kill(1);
        } else {
            printResult(data, fileOut);
        }
    });
};

const webCat = (url, fileOut) => {
    axios.get(url).then((response) => printResult(response.data, fileOut)).catch((err) => {
        console.log(`Error catching ${url}`, err);
        process.exit(1);
    });
};

const catWrite = (data, path) => {
    fs.writeFile(path, data, 'utf8', function(err) {
        if (err) {
            console.log('Error writing to file', err);
            process.exit(1);
        }
    });
};

const printResult = (data, fileOut) => {
    if (fileOut) {
        catWrite(data, fileOut);
    } else {
        console.log(data);
    }
};

const callCat = () => {
    let param = process.argv[2];
    let fileOut;

    if (param === '--out') {
        fileOut = process.argv[3];
        param = process.argv[4];
    }

    if (param.startsWith('https://')) {
        webCat(param, fileOut);
    } else {
        cat(param, fileOut);
    }
};

callCat();