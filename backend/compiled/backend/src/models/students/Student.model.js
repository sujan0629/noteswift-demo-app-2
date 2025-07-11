"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    full_name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        institution: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        province: {
            type: String,
            required: true
        }
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
schema.set("toJSON", {
    transform: function (_doc, ret) {
        delete ret.password;
        return ret;
    },
});
exports.Student = (0, mongoose_1.model)("Student", schema);
