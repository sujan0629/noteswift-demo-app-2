"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAuthRoute = void 0;
const auth_controller_1 = require("../../controller/student/auth.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.StudentAuthRoute = router;
router.post("/signup", auth_controller_1.signUpStudent);
router.post("/login", auth_controller_1.loginStudent);
