import { urlToFilename, download, getPageLinks } from './utils.js'
import { promises as fsPromises } from 'fs' // (1)
import { TaskQueue } from './TaskQueuePC.js'

function spiderLinks(currentUrl, content, nesting, queue) {
    if (nesting === 0) {
        return Promise.resolve()
    }
    const links = getPageLinks(currentUrl, content)
    const promises = links
        .map(link => spiderTask(link, nesting - 1, queue))
    return Promise.all(promises) // (2)
}

const spidering = new Set()

function spiderTask(url, nesting, queue) {
    if (spidering.has(url)) {
        return Promise.resolve()
    }
    spidering.add(url)
    const filename = urlToFilename(url)
    return queue
        .runTask(() => { // (1)
            return fsPromises.readFile(filename, 'utf8')
                .catch((err) => {
                    if (err.code !== 'ENOENT') {
                        throw err
                    }
                    // The file doesn't exists, so let's download it
                    return download(url, filename)
                })
        })
        .then(content => spiderLinks(url, content, nesting, queue))
}

export function spider(url, nesting, concurrency) {
    const queue = new TaskQueue(concurrency)
    return spiderTask(url, nesting, queue)
}