"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// backend/src/models/User.ts
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    avatarEmoji: { type: String, required: true },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
