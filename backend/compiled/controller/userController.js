"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const avatarService_1 = require("../services/avatarService");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Missing fields' });
        return;
    }
    const existing = yield User_1.User.findOne({ username });
    if (existing) {
        res.status(409).json({ error: 'Username taken' });
        return;
    }
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    const avatarEmoji = (0, avatarService_1.generateRandomEmoji)();
    const user = new User_1.User({ username, passwordHash, avatarEmoji });
    yield user.save();
    res.status(201).json({
        userId: user._id,
        username: user.username,
        avatarEmoji: user.avatarEmoji,
    });
});
exports.register = register;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield User_1.User.findById(userId).select('username avatarEmoji');
    if (!user) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    res.json(user);
});
exports.getProfile = getProfile;
