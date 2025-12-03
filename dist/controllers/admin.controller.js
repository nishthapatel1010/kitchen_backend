"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const data_source_1 = require("../config/data-source");
const Admin_1 = require("../entities/Admin");
const adminRepo = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
exports.AdminController = {
    // CREATE
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email } = req.body;
                // 1️⃣ Check email already exists
                const existingAdmin = yield adminRepo.findOne({ where: { email } });
                if (existingAdmin) {
                    return res.status(400).json({ message: "Email already exists" });
                }
                // 2️⃣ Create new admin
                const admin = adminRepo.create({ name, email });
                yield adminRepo.save(admin);
                return res.status(201).json(admin);
            }
            catch (error) {
                return res.status(500).json({ error: error });
            }
        });
    },
    // GET ALL
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const admins = yield adminRepo.find();
            return res.json(admins);
        });
    },
    // GET ONE
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield adminRepo.findOne({
                where: { id: Number(req.params.id) }
            });
            if (!admin)
                return res.status(404).json({ message: "Admin not found" });
            return res.json(admin);
        });
    },
    // UPDATE
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield adminRepo.update({ id }, req.body);
            return res.json({ message: "Admin updated successfully" });
        });
    },
    // DELETE
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield adminRepo.delete({ id });
            return res.json({ message: "Admin deleted successfully" });
        });
    }
};
