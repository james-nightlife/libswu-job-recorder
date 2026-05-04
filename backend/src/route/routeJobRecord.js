import express from 'express';
import { deleteJobRecord, getAllJobRecord, getOneJobRecord, postJobRecord, putJobRecord } from '../controller/controllerJobRecord.js';
import { validateToken } from '../middleware/tokenValidation.js';
import upload from '../middleware/uploadFiles.js'
const router = express.Router();

router.get('/', validateToken, getAllJobRecord);
router.get('/:_id', validateToken, getOneJobRecord);
router.post('/', validateToken, upload.array('files[]') , postJobRecord);
router.put('/:_id', validateToken, putJobRecord);
router.delete('/:_id', validateToken, deleteJobRecord);

export default router;