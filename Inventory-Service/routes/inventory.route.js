import express from 'express';
import inventoryController from '../controllers/inventory.controller.js';

const router = express.Router();

router.post('/check-stock', inventoryController.checkStock);

export default router;