import { Transform } from 'stream';

export class ReplaceStream extends Transform {
    constructor(searchStr, replaceStr, options) {
        super({...options });
        this.searchStr = searchStr;
        this.replaceStr = replaceStr;
        this.tail = '';
    }

    _transform(chunk, encoding, callback) {
        const pieces = (this.tail + chunk).split(this.searchStr); // (1)
        console.log('pieces   :  ',pieces);
        const lastPiece = pieces[pieces.length - 1]; // (2)
        console.log('lastPiece   :  '+lastPiece);

        const tailLen = this.searchStr.length - 1;
        console.log('tailLen   :  '+tailLen);

        this.tail = lastPiece.slice(-tailLen);
        console.log('this.tail   :  '+this.tail);

        pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen);
        console.log('pieces ===>   :  '+pieces);

        this.push(pieces.join(this.replaceStr)); // (3)
        callback();
    }

    _flush(callback) {
        this.push(this.tail);
        callback();
    }

}