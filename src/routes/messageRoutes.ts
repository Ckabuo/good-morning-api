import express from 'express';
import { messageController } from '../controllers/messageController';

const router = express.Router();

router.get('/', messageController.getMessage);
router.get('/all', messageController.getAllMessages);
router.get('/current-index', messageController.getCurrentMessageIndex);
router.get('/last-update', messageController.getLastUpdateTime);
router.get('/count', messageController.getMessageCount);
router.post('/', messageController.addMessage);

export default router;