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
exports.loginStudent = exports.signUpStudent = void 0;
const Response_1 = __importDefault(require("../../lib/Response"));
const Student_model_1 = require("../../models/students/Student.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const expiresIn = 60 * 60 * 24 * 14 * 1000;
const options = { maxAge: expiresIn, httpOnly: false };
const signUpStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonResponse = new Response_1.default(res);
    try {
        const body = req.body;
        const secret = process.env.SESSION_SECRET;
        const salt = yield bcrypt_1.default.genSalt(10);
        const existingStudent = yield Student_model_1.Student.findOne({ phone_number: body.phone_number });
        if (existingStudent) {
            return jsonResponse.clientError("Phone number already registered");
        }
        if (!secret)
            throw new Error("No session secret provided");
        // ✅ Manual validations
        if (!body.full_name || body.full_name.trim().length < 3) {
            return jsonResponse.clientError("Full name is required and must be at least 3 characters");
        }
        if (!body.grade || typeof body.grade !== "number" || body.grade < 1 || body.grade > 12) {
            return jsonResponse.clientError("Grade must be a number between 1 and 12");
        }
        if (!body.phone_number || !/^[9][78]\d{8}$/.test(body.phone_number)) {
            return jsonResponse.clientError("Invalid phone number format");
        }
        if (!body.password || body.password.length < 6) {
            return jsonResponse.clientError("Password must be at least 6 characters long");
        }
        if (!body.address ||
            !body.address.province ||
            !body.address.district ||
            !body.address.institution) {
            return jsonResponse.clientError("Complete address (province, district, institution) is required");
        }
        const encrypted_password = yield bcrypt_1.default.hash(body.password, salt);
        const student = new Student_model_1.Student({
            address: body.address,
            full_name: body.full_name,
            grade: body.grade,
            password: encrypted_password,
            phone_number: body.phone_number,
        });
        yield student.save();
        const token = jsonwebtoken_1.default.sign({ user_id: student._id.toString() }, secret, {
            expiresIn: "10d"
        });
        res.cookie("session", token, options);
        const studentObj = student.toJSON();
        jsonResponse.success(studentObj);
    }
    catch (error) {
        console.error(error);
        jsonResponse.serverError();
    }
});
exports.signUpStudent = signUpStudent;
const loginStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonResponse = new Response_1.default(res);
    try {
        const body = req.body;
        const secret = process.env.SESSION_SECRET;
        if (!secret)
            throw new Error("No session secret provided");
        // Validate input
        if (!body.phone_number || !body.password) {
            return jsonResponse.clientError("Phone number or password missing");
        }
        // Find student
        const student = yield Student_model_1.Student.findOne({ phone_number: body.phone_number });
        if (!student) {
            return jsonResponse.clientError("Student not found");
        }
        // Compare password
        const match = yield bcrypt_1.default.compare(body.password, student.password);
        if (!match) {
            return jsonResponse.clientError("Invalid password");
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ user_id: student._id.toString() }, secret, {
            expiresIn: "10d"
        });
        res.cookie("session", token, options);
        const studentObj = student.toJSON(); // Assuming you handle password hiding in schema
        jsonResponse.success(studentObj);
    }
    catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
});
exports.loginStudent = loginStudent;
