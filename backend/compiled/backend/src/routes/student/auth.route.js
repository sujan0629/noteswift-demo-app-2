"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAuthRoute = void 0;
var auth_controller_1 = require("../../controller/student/auth.controller");
var express_1 = require("express");
var router = (0, express_1.Router)();
exports.StudentAuthRoute = router;
router.post("/signup", auth_controller_1.signUpStudent);
router.post("/login", auth_controller_1.loginStudent);
