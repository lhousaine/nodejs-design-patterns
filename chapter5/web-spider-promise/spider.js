import { urlToFilename, download, getPageLinks } from './utils.js'
import { promises as fsPromises } from 'fs' // (1)

export function spider(url, nesting) {
    const filename = urlToFilename(url);
    return fsPromises.readFile(filename, 'utf8')
        .catch((err) => {
            if (err.code !== 'ENOENT') {
                throw err;
            }
            // The file doesn't exist, so let's download it
            return download(url, filename);
        })
        .then(content => spiderLinks(url, content, nesting));
}

function spiderLinks(currentUrl, content, nesting) {
    let promise = Promise.resolve(); // (1) resolves to undefined
    if (nesting === 0) {
        return promise;
    }
    const links = getPageLinks(currentUrl, content);
    for (const link of links) {
        promise = promise.then(() => spider(link, nesting - 1)); // (2)
    }
    // in the end of for loop promise will continue the resulting promise of the link spider
    // => So, it will resolve only when all the promises in the chain have been resolved.
    return promise;
}