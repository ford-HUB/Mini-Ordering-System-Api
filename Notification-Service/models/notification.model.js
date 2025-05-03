import fs from 'fs';
import path from 'path';

const logPath = path.resolve('notifications.log');

export default {
    logNotification: (notification) => {
        const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const logMessage = `[${timestamp}] Sending ${notification.type} to ${notification.recipient} for order ${notification.orderId}\n`;
        fs.appendFileSync(logPath, logMessage);
        return true;
    }
};