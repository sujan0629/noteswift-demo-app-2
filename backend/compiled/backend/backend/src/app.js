"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const index_route_1 = require("./routes/index.route");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
//CONSANTS
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
// CONNECTIONS
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log("✔️ Connected to MongoDB");
    INIT();
})
    .catch(err => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if connection fails
});
//Middlewares
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
//api
app.use("/api", index_route_1.MainRoutes);
app.use('/api/users', userRoutes_1.default);
async function INIT() {
    app.listen(PORT, () => {
        console.log("Listening on port " + PORT + "....");
    });
}
