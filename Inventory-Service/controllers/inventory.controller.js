import inventoryModel from "../models/inventory.model.js";

export default {
    checkStock: (req, res) => {
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                status: 'unavailable',
                reason: 'Missing productId or quantity'
            });
        }

        const result = inventoryModel.checkStock(productId, quantity);

        if (result.status === 'available') {
            // Optional: Decrement stock
            inventoryModel.updateInventory(productId, quantity);
            return res.status(200).json(result);
        } else {
            return res.status(409).json(result);
        }
    }
};