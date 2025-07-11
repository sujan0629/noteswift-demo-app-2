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
exports.upload = void 0;
exports.uploadPfpToCloud = uploadPfpToCloud;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const dbName_1 = require("./utils/dbName");
const stream_1 = require("stream");
exports.upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() }).any();
function uploadPfpToCloud(userId, fileBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
