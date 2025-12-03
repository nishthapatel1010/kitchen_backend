import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Level } from "../entities/Level";

const levelRepo = AppDataSource.getRepository(Level);

export const LevelController = {
  
  // CREATE
  async create(req: Request, res: Response) {
    try {
      const level = levelRepo.create(req.body);
      await levelRepo.save(level);
      return res.status(201).json(level);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },

  // GET ALL
  async getAll(req: Request, res: Response) {
    const data = await levelRepo.find();
    return res.json(data);  
  },

  // GET ONE
  async getOne(req: Request, res: Response) {
    const level = await levelRepo.findOne({
      where: { id: Number(req.params.id) }
    });

    if (!level) return res.status(404).json({ message: "Level not found" });

    return res.json(level);
  },

  // UPDATE
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    await levelRepo.update({ id }, req.body);
    return res.json({ message: "Updated" });
  },

  // DELETE
  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await levelRepo.delete({ id });
    return res.json({ message: "Deleted" });
  }
};
