import { getAllUsers } from '../controller/user.controller.js';

import { Router } from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', protectRoute, getAllUsers);

export default router;
