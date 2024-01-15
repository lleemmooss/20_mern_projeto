import userController from "../controllers/user.controller.js";
import { validateUser, validateId } from "../middlewares/global.middlewares.js";
import express from "express"

const router = express.Router();

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", validateId, validateUser, userController.findById);
router.patch("/:id", validateId, validateUser, userController.updateById);
router.delete("/:id", validateId, validateUser, userController.deleteById);

export default router;