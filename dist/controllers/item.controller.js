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
exports.generateActivitySentence = exports.ItemController = void 0;
const data_source_1 = require("../config/data-source");
const KitchenItem_1 = require("../entities/KitchenItem");
const Level_1 = require("../entities/Level");
const KitchenCategory_1 = require("../entities/KitchenCategory");
const Admin_1 = require("../entities/Admin");
const itemRepo = data_source_1.AppDataSource.getRepository(KitchenItem_1.KitchenItem);
const levelRepo = data_source_1.AppDataSource.getRepository(Level_1.Level);
const categoryRepo = data_source_1.AppDataSource.getRepository(KitchenCategory_1.KitchenCategory);
const adminRepo = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
exports.ItemController = {
    // CREATE
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, levelId, categoryId, adminId } = req.body;
                const level = yield levelRepo.findOne({ where: { id: levelId } });
                const category = yield categoryRepo.findOne({ where: { id: categoryId } });
                const admin = yield adminRepo.findOne({ where: { id: adminId } });
                if (!level || !category || !admin) {
                    return res.status(400).json({ message: "Invalid Level / Category / Admin ID" });
                }
                const item = itemRepo.create({
                    name,
                    level,
                    category,
                    admin
                });
                yield itemRepo.save(item);
                return res.status(201).json(item);
            }
            catch (error) {
                return res.status(500).json({ error });
            }
        });
    },
    // GET ALL
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield itemRepo.find();
            return res.json(items);
        });
    },
    // GET ONE
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield itemRepo.findOne({
                where: { id: Number(req.params.id) }
            });
            if (!item)
                return res.status(404).json({ message: "Item not found" });
            return res.json(item);
        });
    },
    // UPDATE
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield itemRepo.update({ id }, req.body);
            return res.json({ message: "Item updated successfully" });
        });
    },
    // DELETE
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield itemRepo.delete({ id });
            return res.json({ message: "Item deleted successfully" });
        });
    }
};
// for generate the message 
const generateActivitySentence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const levelId = Number(req.query.levelId);
        if (!levelId) {
            return res.status(400).json({ message: "levelId is required" });
        }
        const items = yield itemRepo.find({
            where: { level: { id: levelId } },
            relations: ["category"]
        });
        if (items.length === 0) {
            return res.status(404).json({ message: "No items found for this level" });
        }
        // 1. Group items by category
        const categoryGroups = {};
        items.forEach((item) => {
            const categoryName = item.category.name;
            if (!categoryGroups[categoryName]) {
                categoryGroups[categoryName] = [];
            }
            categoryGroups[categoryName].push(item);
        });
        // 2. Pick a random category
        const categories = Object.keys(categoryGroups);
        const randomCategoryName = categories[Math.floor(Math.random() * categories.length)];
        const selectedCategoryItems = categoryGroups[randomCategoryName];
        // 3. Pick 2–4 random items
        const shuffled = [...selectedCategoryItems].sort(() => Math.random() - 0.5);
        const count = Math.min(shuffled.length, Math.floor(Math.random() * 3) + 2);
        const selectedItems = shuffled.slice(0, count).map((item) => item.name);
        // 4. Sentence Templates
        const sentenceTemplates = {
            Vegetables: `Chop ${selectedItems.join(", ")} to prepare your dish.`,
            Fruits: `Slice ${selectedItems.join(", ")} to make a fruit bowl.`,
            Spices: `Add ${selectedItems.join(", ")} to enhance the flavor.`,
            Dairy: `Use ${selectedItems.join(", ")} to prepare a dairy-based recipe.`,
            "Cleaning Items": `Use ${selectedItems.join(", ")} to clean your kitchen properly.`
        };
        const sentence = sentenceTemplates[randomCategoryName] ||
            `Use ${selectedItems.join(", ")} for your kitchen activity.`;
        // 5. Return Response
        return res.json({
            category: randomCategoryName,
            selectedItems,
            activitySentence: sentence
        });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.generateActivitySentence = generateActivitySentence;
