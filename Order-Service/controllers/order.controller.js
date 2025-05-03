import inventoryService from '../services/inventoryService.js';
import notificationQueue from '../models/notificationQueue.js';

export default {
    createOrder: async (req, res) => {
        const { userId, items } = req.body;

        if (!userId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                status: 'order_failed',
                reason: 'Missing userId or items'
            });
        }

        // For simplicity, handle first item only
        const { productId, quantity } = items[0];

        try {
            // Synchronous call to Inventory Service
            const inventoryCheck = await inventoryService.checkStock(productId, quantity);

            if (inventoryCheck.status !== 'available') {
                throw new Error(inventoryCheck.reason);
            }

            // Generate simple order ID
            const orderId = `ORD-${Date.now()}`;

            // Asynchronous notification
            notificationQueue.addToQueue({
                type: 'order_confirmation',
                recipient: `${userId}@gmail.com`,
                orderId
            });

            return res.status(201).json({
                status: 'order_created_notification_queued',
                orderId
            });
        } catch (error) {
            return res.status(400).json({
                status: 'order_failed',
                reason: `Inventory check failed: ${error.message}`
            });
        }
    }
};