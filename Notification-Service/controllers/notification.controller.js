import notificationModel from "../models/notification.model.js";

export default {
    sendNotification: (req, res) => {
        const { type, recipient, orderId } = req.body;

        if (!type || !recipient || !orderId) {
            return res.status(400).json({
                status: 'error',
                reason: 'Missing required fields'
            });
        }

        notificationModel.logNotification({ type, recipient, orderId });

        return res.status(202).json({
            status: 'notification_queued'
        });
    }
};