import {Router} from 'express';
import { login, register } from '../Controllers/user.controller.js';
const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity");
router.route("/get_activity");

export default router;