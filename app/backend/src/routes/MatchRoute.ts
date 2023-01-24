import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const router = Router();

// router.get('/?', MatchController.getMatchesInProgress);
router.get('/', MatchController.getAll);

export default router;
