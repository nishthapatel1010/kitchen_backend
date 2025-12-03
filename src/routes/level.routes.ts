import { Router } from "express";
import { LevelController } from "../controllers/level.controller";

const router = Router();

router.post("/", LevelController.create);
router.get("/", LevelController.getAll);
router.get("/:id", LevelController.getOne);
router.put("/:id", LevelController.update);
router.delete("/:id", LevelController.delete);

export default router;
