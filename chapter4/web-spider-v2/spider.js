import fs from 'fs'
import { urlToFilename, download, getPageLinks } from './utils.js'

export function spider(url, nesting, cb) {
    const filename = urlToFilename(url)
    fs.readFile(filename, 'utf8', (err, fileContent) => {
        if (err) {
            if (err.code !== 'ENOENT') {
                return cb(err)
            }
            // The file doesn't exist, so let's download it
            return download(url, filename, (err, requestContent) => {
                if (err) {
                    return cb(err)
                }
                spiderLinks(url, requestContent, nesting, cb)
            })
        }
        // The file already exists, let's process the links
        spiderLinks(url, fileContent, nesting, cb)
    })
}

function spiderLinks(currentUrl, body, nesting, cb) {
    if (nesting === 0) {
        // Remember Zalgo from chapter 3?
        return process.nextTick(cb)
    }
    const links = getPageLinks(currentUrl, body) // (1)
    if (links.length === 0) {
        return process.nextTick(cb)
    }

    function iterate(index) { // (2)
        if (index === links.length) {
            return cb()
        }
        spider(links[index], nesting - 1, function(err) { // (3)
            if (err) {
                return cb(err)
            }
            iterate(index + 1)
        })
    }
    iterate(0) // (4)
}