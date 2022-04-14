import { resolve } from "path";
export function createFSAdapter(db) {
  return {
    readFile(filename, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else if (typeof options === "string") {
        options = { encoding: options };
      }
      db.get(
        // retreive a file from db by filename as a key
        resolve(filename), // use resolve to make sur we always use a full path
        {
          valueEncoding: options.encoding,
        },
        (err, value) => { // manage not found error by throwing error with fs readfile structure 
          if (err) {
            if (err.type === "NotFoundError") {
              err = new Error(`ENOENT, open "${filename}"`);
              err.code = "ENOENT";
              err.errno = 34;
              err.path = filename;
            }
            return callback && callback(err);
          }
          callback && callback(null, value); // call the callback with the result
        }
      );
    },
    writeFile(filename, contents, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else if (typeof options === "string") {
        options = { encoding: options };
      }
      db.put(
        resolve(filename),
        contents,
        {
          valueEncoding: options.encoding,
        },
        callback
      );
    },
  };
}
