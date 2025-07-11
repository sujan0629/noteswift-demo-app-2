"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
exports.validatePassowrd = validatePassowrd;
function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex))
        return {
            success: false,
            message: "Invalid Email"
        };
    return {
        success: true,
        message: ""
    };
}
function validatePassowrd(password) {
    if (password.length < 8)
        return {
            success: false,
            message: "Password should be more than 8 charecters"
        };
    return {
        success: true,
        message: ""
    };
}
