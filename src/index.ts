// src/index.ts
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { AppDataSource } from "./config/data-source";
import levelRoutes from "./routes/level.routes";
import categoryRoutes from "./routes/category.routes";
import adminRoutes from "./routes/admin.routes";
import itemRoutes from "./routes/item.routes";

const app = express();
app.use(express.json());

app.use("/levels", levelRoutes);
app.use("/category", categoryRoutes);
app.use("/admins", adminRoutes);
app.use("/items", itemRoutes);

const PORT = Number(process.env.PORT || 5000);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to DB:", error);
  });
