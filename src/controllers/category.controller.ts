import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { KitchenCategory } from "../entities/KitchenCategory";

const categoryRepo = AppDataSource.getRepository(KitchenCategory);

export const CategoryController = {
  // CREATE
  async create(req: Request, res: Response) {
    try {
      const category = categoryRepo.create(req.body);
      await categoryRepo.save(category);
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error: "Cannot create category" });
    }
  },

  // GET ALL
  async getAll(req: Request, res: Response) {
    const categories = await categoryRepo.find();
    return res.json(categories);
  },

  // GET ONE
  async getOne(req: Request, res: Response) {
    const category = await categoryRepo.findOne({
      where: { id: Number(req.params.id) }
    });

    if (!category) return res.status(404).json({ message: "Category not found" });

    return res.json(category);
  },

  // UPDATE
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    await categoryRepo.update({ id }, req.body);
    return res.json({ message: "Category updated" });
  },

  // DELETE
  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await categoryRepo.delete({ id });
    return res.json({ message: "Category deleted" });
  },
};
