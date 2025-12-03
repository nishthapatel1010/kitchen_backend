"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./config/data-source");
const level_routes_1 = __importDefault(require("./routes/level.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const item_routes_1 = __importDefault(require("./routes/item.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/levels", level_routes_1.default);
app.use("/category", category_routes_1.default);
app.use("/admins", admin_routes_1.default);
app.use("/items", item_routes_1.default);
const PORT = Number(process.env.PORT || 5000);
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Database Connected");
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ Error connecting to DB:", error);
});
