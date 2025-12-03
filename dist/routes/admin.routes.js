"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
router.post("/", admin_controller_1.AdminController.create); // CREATE
router.get("/", admin_controller_1.AdminController.getAll); // GET ALL
router.get("/:id", admin_controller_1.AdminController.getOne); // GET ONE
router.put("/:id", admin_controller_1.AdminController.update); // UPDATE
router.delete("/:id", admin_controller_1.AdminController.delete); // DELETE
exports.default = router;
