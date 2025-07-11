"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/userRoutes.ts
const express_1 = require("express");
// This path must match the folder name exactly:
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.post('/register', userController_1.register);
router.get('/profile/:id', userController_1.getProfile);
exports.default = router;
