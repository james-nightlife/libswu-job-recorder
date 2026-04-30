import express from 'express';
import { deleteJobRecord, getAllJobRecord, getOneJobRecord, postJobRecord, putJobRecord } from '../controller/controllerJobRecord.js';
import { validateToken } from '../middleware/tokenValidation.js';
const router = express.Router();

router.get('/:id', validateToken, getOneJobRecord);
router.get('/', validateToken, getAllJobRecord);
router.post('/', validateToken, postJobRecord);
router.put('/', validateToken, putJobRecord);
router.delete('/:id', validateToken, deleteJobRecord);

export default router;