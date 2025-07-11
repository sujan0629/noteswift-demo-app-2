"use strict";
// src/controller/student/auth.controller.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginStudent = exports.signUpStudent = void 0;
var Response_1 = __importDefault(require("../../lib/Response"));
var Student_model_1 = require("../../models/students/Student.model");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var expiresIn = 60 * 60 * 24 * 14 * 1000;
var options = { maxAge: expiresIn, httpOnly: false };
var signUpStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, body, secret, salt, existingStudent, encrypted_password, student, token, studentObj, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                body = req.body;
                secret = process.env.SESSION_SECRET;
                if (!secret)
                    throw new Error("No session secret provided");
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, Student_model_1.Student.findOne({ phone_number: body.phone_number })];
            case 3:
                existingStudent = _a.sent();
                if (existingStudent) {
                    return [2 /*return*/, jsonResponse.clientError("Phone number already registered")];
                }
                // Manual validations
                if (!body.full_name || body.full_name.trim().length < 3) {
                    return [2 /*return*/, jsonResponse.clientError("Full name is required and must be at least 3 characters")];
                }
                if (!body.grade || typeof body.grade !== "number" || body.grade < 1 || body.grade > 12) {
                    return [2 /*return*/, jsonResponse.clientError("Grade must be a number between 1 and 12")];
                }
                if (!body.phone_number || !/^[9][78]\d{8}$/.test(body.phone_number)) {
                    return [2 /*return*/, jsonResponse.clientError("Invalid phone number format")];
                }
                if (!body.password || body.password.length < 6) {
                    return [2 /*return*/, jsonResponse.clientError("Password must be at least 6 characters long")];
                }
                if (!body.address ||
                    !body.address.province ||
                    !body.address.district ||
                    !body.address.institution) {
                    return [2 /*return*/, jsonResponse.clientError("Complete address (province, district, institution) is required")];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(body.password, salt)];
            case 4:
                encrypted_password = _a.sent();
                student = new Student_model_1.Student({
                    address: body.address,
                    full_name: body.full_name,
                    grade: body.grade,
                    password: encrypted_password,
                    phone_number: body.phone_number,
                });
                return [4 /*yield*/, student.save()];
            case 5:
                _a.sent();
                token = jsonwebtoken_1.default.sign({ user_id: String(student._id) }, secret, {
                    expiresIn: "10d"
                });
                res.cookie("session", token, options);
                studentObj = student.toJSON();
                jsonResponse.success(studentObj);
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                console.error(error_1);
                jsonResponse.serverError();
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signUpStudent = signUpStudent;
var loginStudent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonResponse, body, secret, student, match, token, studentObj, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                jsonResponse = new Response_1.default(res);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                body = req.body;
                secret = process.env.SESSION_SECRET;
                if (!secret)
                    throw new Error("No session secret provided");
                // Validate input
                if (!body.phone_number || !body.password) {
                    return [2 /*return*/, jsonResponse.clientError("Phone number or password missing")];
                }
                return [4 /*yield*/, Student_model_1.Student.findOne({ phone_number: body.phone_number })];
            case 2:
                student = _a.sent();
                if (!student) {
                    return [2 /*return*/, jsonResponse.clientError("Student not found")];
                }
                // Check if password exists on student document
                if (!student.password) {
                    return [2 /*return*/, jsonResponse.serverError("Password missing for this user")];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(body.password, student.password)];
            case 3:
                match = _a.sent();
                if (!match) {
                    return [2 /*return*/, jsonResponse.clientError("Invalid password")];
                }
                token = jsonwebtoken_1.default.sign({ user_id: String(student._id) }, secret, {
                    expiresIn: "10d"
                });
                res.cookie("session", token, options);
                studentObj = student.toJSON();
                jsonResponse.success(studentObj);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                jsonResponse.serverError();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginStudent = loginStudent;
