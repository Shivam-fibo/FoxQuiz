import { Router } from "express";
import { loginAdmin, refreshAccessToken, registerAdmin } from "../controller/admin.controller.js";


const router = Router();

router.post('/login', loginAdmin)
router.post('/register', registerAdmin)
router.post('/refreshAccessToken',refreshAccessToken )


export default router