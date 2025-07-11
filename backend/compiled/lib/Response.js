"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JsonResponse {
    constructor(res) {
        this.res = res;
    }
    success(result = {}, message = "success") {
        this.res.status(200).json({
            error: false,
            status: 200,
            result,
            message
        });
    }
    serverError(message = "Internal Server Error", result = null) {
        this.res.status(200).json({
            error: true,
            status: 500,
            result,
            message
        });
    }
    notFound(message) {
        this.res.status(200).json({
            error: true,
            status: 404,
            result: null,
            message
        });
    }
    notAuthorized(message = "Not authorized") {
        this.res.status(200).json({
            error: true,
            status: 401,
            result: null,
            message
        });
    }
    clientError(message, result = null) {
        this.res.status(200).json({
            error: true,
            status: 400,
            result,
            message
        });
    }
}
exports.default = JsonResponse;
