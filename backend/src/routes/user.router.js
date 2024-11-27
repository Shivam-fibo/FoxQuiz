import { Router } from "express";

import { registerUser, loginUser, getUser, refreshAccessToken, logout } from "../controller/user.controller.js";
import {verifyToken} from '../middleware/auth.middleware.js'

const router = Router();


router.post('/login', loginUser);
router.post('/register', registerUser)
router.post('/logout', logout);
router.get('/getUser', verifyToken, getUser);
router.post('/refresh-token', refreshAccessToken);






export default router
