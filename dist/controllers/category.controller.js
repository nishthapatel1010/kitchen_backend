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
exports.CategoryController = void 0;
const data_source_1 = require("../config/data-source");
const KitchenCategory_1 = require("../entities/KitchenCategory");
const categoryRepo = data_source_1.AppDataSource.getRepository(KitchenCategory_1.KitchenCategory);
exports.CategoryController = {
    // CREATE
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = categoryRepo.create(req.body);
                yield categoryRepo.save(category);
                return res.status(201).json(category);
            }
            catch (error) {
                return res.status(500).json({ error: "Cannot create category" });
            }
        });
    },
    // GET ALL
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield categoryRepo.find();
            return res.json(categories);
        });
    },
    // GET ONE
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield categoryRepo.findOne({
                where: { id: Number(req.params.id) }
            });
            if (!category)
                return res.status(404).json({ message: "Category not found" });
            return res.json(category);
        });
    },
    // UPDATE
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield categoryRepo.update({ id }, req.body);
            return res.json({ message: "Category updated" });
        });
    },
    // DELETE
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield categoryRepo.delete({ id });
            return res.json({ message: "Category deleted" });
        });
    },
};
