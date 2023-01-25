import { Router } from 'express';
import jwtValidate from '../authentication/jwtValidate';
import MatchController from '../controllers/MatchController';

const router = Router();

// router.get('/?', MatchController.getMatchesInProgress);
router.get('/', MatchController.getAll);
router.post('/', jwtValidate, MatchController.create);
router.patch('/:id/finish', MatchController.updateProgress);

export default router;
