import { urlToFilename, download, getPageLinks } from './utils.js'
import { promises as fsPromises } from 'fs' // (1)

async function spiderLinks(currentUrl, content, nesting) {
    if (nesting === 0) {
        return;
    }
    const links = getPageLinks(currentUrl, content)
    for (const link of links) {
        await spider(link, nesting - 1)
    }
}

export async function spider(url, nesting) {
    const filename = urlToFilename(url)
    let content
    try {
        content = await fsPromises.readFile(filename, 'utf8')
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err
        }
        content = await download(url, filename)
    }
    return spiderLinks(url, content, nesting)
}