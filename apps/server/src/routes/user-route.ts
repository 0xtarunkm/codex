import { Router } from 'express';
import {
  getUser,
  login,
  logout,
  register,
} from '../controllers/user-controller';
import { authenticateUserJWT } from '../middlewares/authenticate-user';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateUserJWT, getUser);

export default router;
