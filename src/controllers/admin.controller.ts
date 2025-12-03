import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Admin } from "../entities/Admin";

const adminRepo = AppDataSource.getRepository(Admin);

export const AdminController = {

  // CREATE
  async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      // 1️⃣ Check email already exists
      const existingAdmin = await adminRepo.findOne({ where: { email } });

      if (existingAdmin) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // 2️⃣ Create new admin
      const admin = adminRepo.create({ name, email });
      await adminRepo.save(admin);

      return res.status(201).json(admin);

    } catch (error) {
      return res.status(500).json({ error: error });
    }
  },

  // GET ALL
  async getAll(req: Request, res: Response) {
    const admins = await adminRepo.find();
    return res.json(admins);
  },

  // GET ONE
  async getOne(req: Request, res: Response) {
    const admin = await adminRepo.findOne({
      where: { id: Number(req.params.id) }
    });

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    return res.json(admin);
  },

  // UPDATE
  async update(req: Request, res: Response) {
    const id = Number(req.params.id);

    await adminRepo.update({ id }, req.body);

    return res.json({ message: "Admin updated successfully" });
  },

  // DELETE
  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    await adminRepo.delete({ id });

    return res.json({ message: "Admin deleted successfully" });
  }
};
