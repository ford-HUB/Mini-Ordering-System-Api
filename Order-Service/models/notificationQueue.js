import fs from 'fs';
import path from 'path';

const queuePath = path.resolve('notification_queue.log');

export default {
    addToQueue: (notification) => {
        const queueEntry = JSON.stringify(notification) + '\n';
        fs.appendFileSync(queuePath, queueEntry);
        return true;
    }
};