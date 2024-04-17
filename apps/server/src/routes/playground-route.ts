import { Router } from 'express';
import { authenticateUserJWT } from '../middlewares/authenticate-user';
import {
  closePlayground,
  createPlayground,
  deletePlayground,
  getPlayground,
  getPlaygrounds,
  getStatus,
  startPlayground,
} from '../controllers/playground-controller';

const router = Router();

router
  .route('/playground')
  .post(authenticateUserJWT, createPlayground)
  .get(authenticateUserJWT, getPlaygrounds);

router
  .route('/playground/:playgroundId')
  .delete(authenticateUserJWT, deletePlayground)
  .get(authenticateUserJWT, getPlayground);

router.delete(
  '/playground/close/:playgroundId',
  authenticateUserJWT,
  closePlayground
);

router.get(
  '/playground/start/:playgroundId',
  authenticateUserJWT,
  startPlayground
);

router.post('/playground/status', authenticateUserJWT, getStatus);

export default router;
