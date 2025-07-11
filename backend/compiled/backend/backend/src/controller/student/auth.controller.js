"use strict";
// src/controller/student/auth.controller.ts
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
const signUpStudent = async (req, res) => {
    const jsonResponse = new Response_1.default(res);
    try {
        const body = req.body;
        const secret = process.env.SESSION_SECRET;
        if (!secret)
            throw new Error("No session secret provided");
        const salt = await bcrypt_1.default.genSalt(10);
        const existingStudent = await Student_model_1.Student.findOne({ phone_number: body.phone_number });
        if (existingStudent) {
            return jsonResponse.clientError("Phone number already registered");
        }
        // Manual validations
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
        const encrypted_password = await bcrypt_1.default.hash(body.password, salt);
        const student = new Student_model_1.Student({
            address: body.address,
            full_name: body.full_name,
            grade: body.grade,
            password: encrypted_password,
            phone_number: body.phone_number,
        });
        await student.save();
        const token = jsonwebtoken_1.default.sign({ user_id: String(student._id) }, secret, {
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
};
exports.signUpStudent = signUpStudent;
const loginStudent = async (req, res) => {
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
        const student = await Student_model_1.Student.findOne({ phone_number: body.phone_number });
        if (!student) {
            return jsonResponse.clientError("Student not found");
        }
        // Check if password exists on student document
        if (!student.password) {
            return jsonResponse.serverError("Password missing for this user");
        }
        // Compare password (cast to string to satisfy TS)
        const match = await bcrypt_1.default.compare(body.password, student.password);
        if (!match) {
            return jsonResponse.clientError("Invalid password");
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ user_id: String(student._id) }, secret, {
            expiresIn: "10d"
        });
        res.cookie("session", token, options);
        const studentObj = student.toJSON(); // Assuming password is hidden in schema
        jsonResponse.success(studentObj);
    }
    catch (error) {
        console.error(error);
        jsonResponse.serverError();
    }
};
exports.loginStudent = loginStudent;
