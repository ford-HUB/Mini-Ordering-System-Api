import fs from 'fs';
import path from 'path';
import notificationModel from './models/notification.model.js';

const queuePath = path.resolve('../order-service/notification_queue.log');

const processQueue = () => {
    try {
        if (fs.existsSync(queuePath)) {
            const data = fs.readFileSync(queuePath, 'utf8');
            if (data.trim()) {
                const lines = data.split('\n').filter(line => line.trim());

                if (lines.length > 0) {
                    const notification = JSON.parse(lines[0]);
                    notificationModel.logNotification(notification);

                    // Remove processed notification
                    const remainingLines = lines.slice(1).join('\n');
                    fs.writeFileSync(queuePath, remainingLines);

                    console.log(`Processed notification for order ${notification.orderId}`);
                }
            }
        }
    } catch (error) {
        console.error('Error processing queue:', error);
    }
};

// Run worker every 5 seconds
setInterval(processQueue, 5000);
console.log('Notification worker started. Checking queue every 5 seconds...');