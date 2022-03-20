import fs from 'fs';
import { urlToFilename, download, getPageLinks } from './utils.js';

const spidering = new Set() // (1)
// verify the url already enter in dowload process to avoid C.Race, then create a spiderTask for the url and add it to URL
export function spider(url, nesting, queue) {
    if (spidering.has(url)) {
        return
    }
    spidering.add(url)
    queue.pushTask((done) => { // (2)
        spiderTask(url, nesting, queue, done)
    })
}

function spiderTask(url, nesting, queue, cb) { // (1)
    const filename = urlToFilename(url)
    fs.readFile(filename, 'utf8', (err, fileContent) => {
        if (err) {
            if (err.code !== 'ENOENT') {
                return cb(err);
            }
            return download(url, filename, (err, requestContent) => {
                if (err) {
                    return cb(err);
                }
                spiderLinks(url, requestContent, nesting, queue); // (2)
                return cb();
            })
        }
        spiderLinks(url, fileContent, nesting, queue); // (3)
        return cb();
    })
}

function spiderLinks(currentUrl, body, nesting, queue) {
    if (nesting === 0) {
        return;
    }
    const links = getPageLinks(currentUrl, body);
    if (links.length === 0) {
        return;
    }
    links.forEach(link => spider(link, nesting - 1, queue));
}
