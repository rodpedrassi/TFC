import { Router } from 'express';
import TemController from '../controllers/TemController';

const router = Router();

router.get('/', TemController.getAll);

export default router;
