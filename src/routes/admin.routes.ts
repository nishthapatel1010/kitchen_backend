import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";

const router = Router();

router.post("/", AdminController.create);       // CREATE
router.get("/", AdminController.getAll);        // GET ALL
router.get("/:id", AdminController.getOne);     // GET ONE
router.put("/:id", AdminController.update);     // UPDATE
router.delete("/:id", AdminController.delete);  // DELETE

export default router;
