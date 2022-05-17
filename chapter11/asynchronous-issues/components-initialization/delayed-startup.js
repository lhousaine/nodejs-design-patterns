import { db } from "./db.js";
import { once } from "events";

async function initialize() {
  db.connect();
  await once(db, "connected");
}

async function updateLastAccess() {
  await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`);
}
/**
 * this involves delaying the execution of any code relying on
 * the asynchronously initialized component until the component has finished its
 * initialization routine
 * */
initialize().then(() => {
  updateLastAccess();
  setTimeout(() => {
    updateLastAccess();
  }, 600);
});
/**
 * The main disadvantage of this technique is that it requires us to know, in advance,
which components will make use of the asynchronously initialized component,
which makes our code fragile and exposed to mistakes. One solution to this problem
is delaying the startup of the entire application until all the asynchronous services
are initialized.
 */