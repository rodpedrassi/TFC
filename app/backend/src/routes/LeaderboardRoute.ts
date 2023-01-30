import { Router } from 'express';
import test from '../controllers/test';

const router = Router();

router.get('/home', test.testzim);

export default router;
