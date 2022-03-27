import { promises as fsPromises } from 'fs' // (1)
import path, { dirname } from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import slug from 'slug'
import { promisify } from 'util'
const mkdirpPromises = promisify(mkdirp) // (2)
import cheerio from 'cheerio';

function getLinkUrl(currentUrl, element) {
    const parsedLink = new URL(element.attribs.href || '', currentUrl)
    const currentParsedUrl = new URL(currentUrl)
    if (parsedLink.hostname !== currentParsedUrl.hostname ||
        !parsedLink.pathname) {
        return null
    }
    return parsedLink.toString()
};

export function urlToFilename(url) {
    const parsedUrl = new URL(url)
    const urlPath = parsedUrl.pathname.split('/')
        .filter(function(component) {
            return component !== ''
        })
        .map(function(component) {
            return slug(component, { remove: null })
        })
        .join('/');
    let filename = path.join(parsedUrl.hostname, urlPath);
    if (!path.extname(filename).match(/htm/)) {
        filename += '.html';
    }

    return filename
}

export function getPageLinks(currentUrl, body) {
    return Array.from(cheerio.load(body)('a'))
        .map(function(element) {
            return getLinkUrl(currentUrl, element)
        })
        .filter(Boolean)
};

export function download(url, filename) {
    console.log(`Downloading ${url}`)
    let content;
    return superagent.get(url) // (1)
        .then((res) => {
            content = res.text; // (2)
            return mkdirpPromises(dirname(filename));
        })
        .then(() => fsPromises.writeFile(filename, content))
        .then(() => {
            console.log(`Downloaded and saved: ${url}`);
            return content; // (3)
        })
}