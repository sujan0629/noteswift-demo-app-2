"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const avatarService_1 = require("../services/avatarService");
const register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Missing fields' });
        return;
    }
    const existing = await User_1.User.findOne({ username });
    if (existing) {
        res.status(409).json({ error: 'Username taken' });
        return;
    }
    const passwordHash = await bcrypt_1.default.hash(password, 10);
    const avatarEmoji = (0, avatarService_1.generateRandomEmoji)();
    const user = new User_1.User({ username, passwordHash, avatarEmoji });
    await user.save();
    res.status(201).json({
        userId: user._id,
        username: user.username,
        avatarEmoji: user.avatarEmoji,
    });
};
exports.register = register;
const getProfile = async (req, res) => {
    const userId = req.params.id;
    const user = await User_1.User.findById(userId).select('username avatarEmoji');
    if (!user) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    res.json(user);
};
exports.getProfile = getProfile;
