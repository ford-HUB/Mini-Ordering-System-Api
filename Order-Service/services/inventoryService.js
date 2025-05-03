import axios from 'axios';

const INVENTORY_SERVICE_URL = 'http://localhost:8000/check-stock';

export default {
    checkStock: async (productId, quantity) => {
        try {
            const response = await axios.post(INVENTORY_SERVICE_URL, {
                productId,
                quantity
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.reason || 'Inventory check failed');
            } else {
                throw new Error('Inventory service unavailable');
            }
        }
    }
};