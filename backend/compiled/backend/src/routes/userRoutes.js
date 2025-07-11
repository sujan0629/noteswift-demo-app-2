"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/userRoutes.ts
var express_1 = require("express");
// This path must match the folder name exactly:
var userController_1 = require("../controller/userController");
var router = (0, express_1.Router)();
router.post('/register', userController_1.register);
router.get('/profile/:id', userController_1.getProfile);
exports.default = router;
