import { Router } from "express";
import verifyLogin from "../middlewares/auth.middleware.js";
import { addTask, fetchAlltasks, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = Router();

router.route('/').post(verifyLogin, addTask);
router.route('/').get(verifyLogin, fetchAlltasks);
router.route('/:id').patch(verifyLogin, updateTask);
router.route('/:id').delete(verifyLogin, deleteTask);

export default router;