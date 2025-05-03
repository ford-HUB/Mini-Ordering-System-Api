import fs from 'fs';
import path from 'path';

const inventoryPath = path.resolve('inventory.json');

const inventoryModel = {
    getInventory() {
        const data = fs.readFileSync(inventoryPath, 'utf8');
        return JSON.parse(data);
    },

    updateInventory(productId, quantity) {
        const inventory = this.getInventory();
        if (inventory[productId] !== undefined) {
            inventory[productId] -= quantity;
            fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2));
            return true;
        }
        return false;
    },

    checkStock(productId, quantity) {
        const inventory = this.getInventory();
        if (inventory[productId] === undefined) {
            return { status: 'unavailable', reason: 'Product not found' };
        }
        if (inventory[productId] < quantity) {
            return { status: 'unavailable', reason: 'Insufficient stock' };
        }
        return {
            status: 'available',
            productId,
            quantityChecked: quantity
        };
    }
};

export default inventoryModel;
