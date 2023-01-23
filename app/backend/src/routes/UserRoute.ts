import { Router } from 'express';
import checkFieldsUser from '../middlewares/checkFieldsUser';
import UserController from '../controllers/UserController';
import jwtValidate from '../authentication/jwtValidate';

const router = Router();

router.post('/', checkFieldsUser, UserController.login);
router.get('/validate', jwtValidate, UserController.getRole);

export default router;
