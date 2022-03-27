export class TaskQueue {
    constructor(concurrency) {
        this.taskQueue = []
        this.consumerQueue = []
        for (let i = 0; i < concurrency; i++) {
            this.consumer()
        }
    }

    async consumer() {
        while (true) { // (1)
            try {
                const task = await this.getNextTask() // (2)
                await task() // (3)
            } catch (err) {
                console.error(err) // (4)
            }
        }
    }

    runTask(task) {
        return new Promise((resolve, reject) => {
            const taskWrapper = () => { // (1)
                const taskPromise = task();
                taskPromise.then(resolve, reject);
                return taskPromise;
            }
            if (this.consumerQueue.length !== 0) { // (2)
                const consumer = this.consumerQueue.shift();
                consumer(taskWrapper);
            } else { // (3)
                this.taskQueue.push(taskWrapper);
            }
        });
    }

    async getNextTask() {
        return new Promise((resolve) => {
            if (this.taskQueue.length !== 0) {
                return resolve(this.taskQueue.shift()) // (1)
            }
            this.consumerQueue.push(resolve) // (2)
        })
    }
}