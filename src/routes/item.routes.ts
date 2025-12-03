import { Router } from "express";
import { ItemController } from "../controllers/item.controller";
import {generateActivitySentence} from "../controllers/item.controller";

const router = Router();

router.post("/", ItemController.create);
router.get("/", ItemController.getAll);
router.get("/:id", ItemController.getOne);
router.put("/:id", ItemController.update);
router.delete("/:id", ItemController.delete);
router.get("/activity/generate", generateActivitySentence);

export default router;
