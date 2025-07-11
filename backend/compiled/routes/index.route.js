"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRoutes = void 0;
const express_1 = require("express");
const auth_route_1 = require("./student/auth.route");
const router = (0, express_1.Router)();
exports.MainRoutes = router;
router.use("/student/auth", auth_route_1.StudentAuthRoute);
