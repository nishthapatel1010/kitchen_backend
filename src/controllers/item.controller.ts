import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { KitchenItem } from "../entities/KitchenItem";
import { Level } from "../entities/Level";
import { KitchenCategory } from "../entities/KitchenCategory";
import { Admin } from "../entities/Admin";

const itemRepo = AppDataSource.getRepository(KitchenItem);
const levelRepo = AppDataSource.getRepository(Level);
const categoryRepo = AppDataSource.getRepository(KitchenCategory);
const adminRepo = AppDataSource.getRepository(Admin);

export const ItemController = {

  // CREATE
  async create(req: Request, res: Response) {
    try {
      const { name, levelId, categoryId, adminId } = req.body;

      const level = await levelRepo.findOne({ where: { id: levelId } });
      const category = await categoryRepo.findOne({ where: { id: categoryId } });
      const admin = await adminRepo.findOne({ where: { id: adminId } });

      if (!level || !category || !admin) {
        return res.status(400).json({ message: "Invalid Level / Category / Admin ID" });
      }

      const item = itemRepo.create({
        name,
        level,
        category,
        admin
      });

      await itemRepo.save(item);

      return res.status(201).json(item);
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  // GET ALL
  async getAll(req: Request, res: Response) {
    const items = await itemRepo.find();
    return res.json(items);
  },

  // GET ONE
  async getOne(req: Request, res: Response) {
    const item = await itemRepo.findOne({
      where: { id: Number(req.params.id) }
    });

    if (!item) return res.status(404).json({ message: "Item not found" });

    return res.json(item);
  },

  // UPDATE
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    await itemRepo.update({ id }, req.body);

    return res.json({ message: "Item updated successfully" });
  },

  // DELETE
  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    await itemRepo.delete({ id });

    return res.json({ message: "Item deleted successfully" });
  }
};

// for generate the message 
export const generateActivitySentence = async (req: Request, res: Response): Promise<Response> => {
  try {
    const levelId = Number(req.query.levelId);

    if (!levelId) {
      return res.status(400).json({ message: "levelId is required" });
    }

    const items: KitchenItem[] = await itemRepo.find({
      where: { level: { id: levelId } },
      relations: ["category"]
    });

    if (items.length === 0) {
      return res.status(404).json({ message: "No items found for this level" });
    }

    // 1. Group items by category
    const categoryGroups: Record<string, KitchenItem[]> = {};

    items.forEach((item: KitchenItem) => {
      const categoryName = item.category.name;

      if (!categoryGroups[categoryName]) {
        categoryGroups[categoryName] = [];
      }
      categoryGroups[categoryName].push(item);
    });

    // 2. Pick a random category
    const categories: string[] = Object.keys(categoryGroups);
    const randomCategoryName: string =
      categories[Math.floor(Math.random() * categories.length)];

    const selectedCategoryItems: KitchenItem[] = categoryGroups[randomCategoryName];

    // 3. Pick 2–4 random items
    const shuffled = [...selectedCategoryItems].sort(() => Math.random() - 0.5);
    const count = Math.min(shuffled.length, Math.floor(Math.random() * 3) + 2);

    const selectedItems: string[] = shuffled.slice(0, count).map((item: KitchenItem) => item.name);

    // 4. Sentence Templates
    const sentenceTemplates: Record<string, string> = {
      Vegetables: `Chop ${selectedItems.join(", ")} to prepare your dish.`,
      Fruits: `Slice ${selectedItems.join(", ")} to make a fruit bowl.`,
      Spices: `Add ${selectedItems.join(", ")} to enhance the flavor.`,
      Dairy: `Use ${selectedItems.join(", ")} to prepare a dairy-based recipe.`,
      "Cleaning Items": `Use ${selectedItems.join(", ")} to clean your kitchen properly.`
    };

    const sentence =
      sentenceTemplates[randomCategoryName] ||
      `Use ${selectedItems.join(", ")} for your kitchen activity.`;

    // 5. Return Response
    return res.json({
      category: randomCategoryName,
      selectedItems,
      activitySentence: sentence
    });

  } catch (error) {
    return res.status(500).json({ error });
  }
};
