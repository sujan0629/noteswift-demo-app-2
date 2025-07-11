"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
exports.uploadPfpToCloud = uploadPfpToCloud;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const dbName_1 = require("./utils/dbName");
const stream_1 = require("stream");
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }).any();
async function uploadPfpToCloud(userId, fileBuffer) {
    return new Promise((resolve, reject) => {
        const folderPath = `${dbName_1.STORAGE_NAME}/user_pfps/${userId}`;
        const public_id = `${folderPath}/profile`;
        // Upload the new profile picture
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({ public_id, overwrite: true }, (error, result) => {
            if (error) {
                reject(error);
            }
            else if (result) {
                resolve(result.secure_url);
            }
            else {
                reject(new Error('Unknown error during upload'));
            }
        });
        const readableStream = new stream_1.Readable();
        readableStream.push(fileBuffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
}
