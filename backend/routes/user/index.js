import { Router } from "express";
import userController from "../../controllers/user/index.js";

const router = Router()

router.get("", userController)

export default router