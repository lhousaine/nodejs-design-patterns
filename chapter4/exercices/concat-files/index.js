import fs from 'fs';
import path from 'path';

function concatFiles(files, destFile, cb) {
    console.log('length :  ' + files);
    files.forEach(file => {
        const data = fs.readFileSync(file);
        if (!!data){
            fs.appendFileSync(destFile, data);
        }else{
         cb(`failed to read the file ${file}`);
        }
    });
};

concatFiles(['data1.txt', 'data2.txt'], 'dest.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
})