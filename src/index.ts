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
// Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database Connected");

    app.listen(5000, () => {
      console.log("🚀 Server running at http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to DB:", error);
  });
