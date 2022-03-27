import delayError from "./delay.js";

async function playingWithErrors(throwSyncError) {
    try {
        if (throwSyncError) {
            throw new Error('This is a synchronous error')
        }
        await delayError(1000)
    } catch (err) {
        console.error(`We have an error: ${err.message}`)
    } finally {
        console.log('Done')
    }
}
playingWithErrors(true); // throw sync error
playingWithErrors(); // throw async error