import express from 'express';
import { auth } from '../controller/controllerAuth.js';

const router = express.Router();

router.post('/', auth);

export default router;